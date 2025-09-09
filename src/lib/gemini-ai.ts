// Gemini 2.0 Flash AI Service for Movie Recommendations

import { Movie } from "./tmdb";
import { tmdbService } from "./tmdb";

export interface AIQuery {
  description: string;
  mood?: string;
  genre?: string;
  era?: string;
  style?: string;
}

export interface RecommendationResult {
  movies: Movie[];
  explanation: string;
  confidence: number;
  tags: string[];
}

// Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyCuEpBRbqp64DWdy1QaSUxGPichrgny_uk';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

class GeminiAIService {
  private genreMap: { [key: string]: number } = {
    'action': 28,
    'adventure': 12,
    'animation': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'history': 36,
    'horror': 27,
    'music': 10402,
    'mystery': 9648,
    'romance': 10749,
    'science fiction': 878,
    'sci-fi': 878,
    'tv movie': 10770,
    'thriller': 53,
    'war': 10752,
    'western': 37
  };

  private async callGeminiAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || '';
    } catch (error) {
      console.error('Gemini API request failed:', error);
      throw error;
    }
  }

  async analyzeQuery(query: AIQuery): Promise<RecommendationResult> {
    try {
      const prompt = `
        You are an expert movie and TV show database analyst. Your job is to find EXACT matches and similar content.
        
        User Request: "${query.description}"
        
        Analyze this request and provide a comprehensive JSON response with:
        1. "exact_titles" - Array of exact movie/TV show titles if the user is describing a specific known film/show
        2. "genres" - Array of 2-4 most relevant genres (action, adventure, animation, comedy, crime, documentary, drama, family, fantasy, history, horror, music, mystery, romance, science fiction, thriller, war, western)
        3. "primary_keywords" - Array of 3-5 main search terms (most important words from the request)
        4. "alternative_keywords" - Array of 3-5 alternative search terms (synonyms, related concepts)
        5. "specific_elements" - Array of specific plot elements, character types, or themes mentioned
        6. "mood" - Single word (dark, uplifting, thoughtful, exciting, emotional, funny, mysterious)
        7. "era" - Time period if mentioned ("1990s", "2000s", "recent", "classic", "any")
        8. "media_type" - "movie", "tv", or "both" based on user request
        9. "explanation" - Brief explanation of the analysis
        10. "confidence" - Confidence score 1-100
        
        IMPORTANT: If the user describes a plot that sounds like a specific movie/TV show, include the exact title in "exact_titles".
        
        Return ONLY valid JSON, no other text.
      `;

      const geminiResponse = await this.callGeminiAPI(prompt);
      
      let aiAnalysis;
      try {
        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiAnalysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        aiAnalysis = this.getEnhancedFallbackAnalysis(query.description);
      }

      // Enhanced search strategy
      let movies: Movie[] = [];
      
      // 1. First try exact title matches if provided
      if (aiAnalysis.exact_titles && aiAnalysis.exact_titles.length > 0) {
        for (const title of aiAnalysis.exact_titles.slice(0, 2)) {
          const exactResults = await tmdbService.searchMovies(title);
          if (exactResults.results.length > 0) {
            movies.push(...exactResults.results.slice(0, 3));
          }
          
          // Also search TV shows if media_type includes TV
          if (aiAnalysis.media_type === 'tv' || aiAnalysis.media_type === 'both') {
            const tvResults = await tmdbService.searchTVShows(title);
            if (tvResults.results.length > 0) {
              // Convert TV shows to movie format
              const convertedTVShows = tvResults.results.slice(0, 2).map((tv: any) => ({
                ...tv,
                title: tv.name,
                release_date: tv.first_air_date,
                genre_ids: tv.genre_ids || []
              }));
              movies.push(...convertedTVShows);
            }
          }
        }
      }

      // 2. Advanced keyword search if no exact matches or need more results
      if (movies.length < 6) {
        const allKeywords = [
          ...(aiAnalysis.primary_keywords || []),
          ...(aiAnalysis.alternative_keywords || []),
          ...(aiAnalysis.specific_elements || [])
        ];

        const genreIds = (aiAnalysis.genres || []).map((g: string) => this.genreMap[g.toLowerCase()]).filter(Boolean);
        
        const advancedResults = await tmdbService.advancedSearch(allKeywords, genreIds);
        movies.push(...advancedResults.results.slice(0, 12 - movies.length));
      }

      // 3. Remove duplicates
      const uniqueMovies = movies.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id)
      );

      // 4. Fallback if still no results
      if (uniqueMovies.length === 0) {
        const fallbackGenre = aiAnalysis.genres?.[0];
        if (fallbackGenre && this.genreMap[fallbackGenre.toLowerCase()]) {
          const genreResults = await tmdbService.getMoviesByGenre(this.genreMap[fallbackGenre.toLowerCase()]);
          uniqueMovies.push(...genreResults.results.slice(0, 8));
        } else {
          const popularResults = await tmdbService.getPopularMovies();
          uniqueMovies.push(...popularResults.results.slice(0, 8));
        }
      }

      return {
        movies: uniqueMovies.slice(0, 8), // Return up to 8 movies
        explanation: aiAnalysis.explanation || "Based on your description, here are the most relevant movies and TV shows from our comprehensive database.",
        confidence: aiAnalysis.confidence || 85,
        tags: [
          ...(aiAnalysis.genres || []),
          ...(aiAnalysis.specific_elements || []).slice(0, 2),
          aiAnalysis.mood || 'recommended'
        ].filter(Boolean)
      };

    } catch (error) {
      console.error('Error in enhanced AI analysis:', error);
      return this.getFallbackRecommendations(query);
    }
  }

  async getMoodBasedRecommendations(mood: string): Promise<Movie[]> {
    try {
      const prompt = `
        Suggest movie genres and keywords for someone in a "${mood}" mood.
        Return JSON with:
        - "genres": Array of 2-3 matching genres
        - "keywords": Array of 3 search terms
        
        Return ONLY valid JSON.
      `;

      const geminiResponse = await this.callGeminiAPI(prompt);
      
      let moodAnalysis;
      try {
        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          moodAnalysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch (parseError) {
        moodAnalysis = this.getFallbackMoodAnalysis(mood);
      }

      // Get movies based on mood analysis
      let movies: Movie[] = [];
      
      if (moodAnalysis.genres && moodAnalysis.genres.length > 0) {
        const genreId = this.genreMap[moodAnalysis.genres[0].toLowerCase()];
        if (genreId) {
          const genreResults = await tmdbService.getMoviesByGenre(genreId);
          movies = genreResults.results.slice(0, 6);
        }
      }

      if (movies.length === 0) {
        const trendingResults = await tmdbService.getTrendingMovies();
        movies = trendingResults.results.slice(0, 6);
      }

      return movies;
    } catch (error) {
      console.error('Error getting mood recommendations:', error);
      const trendingResults = await tmdbService.getTrendingMovies();
      return trendingResults.results.slice(0, 6);
    }
  }

  async getSimilarMovies(movie: Movie): Promise<Movie[]> {
    try {
      const prompt = `
        Given this movie: "${movie.title}" (${movie.overview.slice(0, 200)})
        
        Suggest search keywords for finding similar movies.
        Return JSON with "keywords" array of 3-4 terms.
        
        Return ONLY valid JSON.
      `;

      const geminiResponse = await this.callGeminiAPI(prompt);
      
      let similarAnalysis;
      try {
        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          similarAnalysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch (parseError) {
        // Fallback to genre-based similarity
        if (movie.genre_ids && movie.genre_ids.length > 0) {
          const genreResults = await tmdbService.getMoviesByGenre(movie.genre_ids[0]);
          return genreResults.results.filter(m => m.id !== movie.id).slice(0, 4);
        }
      }

      if (similarAnalysis.keywords && similarAnalysis.keywords.length > 0) {
        const searchQuery = similarAnalysis.keywords.slice(0, 2).join(' ');
        const searchResults = await tmdbService.searchMovies(searchQuery);
        return searchResults.results.filter(m => m.id !== movie.id).slice(0, 4);
      }

      // Fallback to genre-based similarity
      if (movie.genre_ids && movie.genre_ids.length > 0) {
        const genreResults = await tmdbService.getMoviesByGenre(movie.genre_ids[0]);
        return genreResults.results.filter(m => m.id !== movie.id).slice(0, 4);
      }

      return [];
    } catch (error) {
      console.error('Error getting similar movies:', error);
      return [];
    }
  }

  private getEnhancedFallbackAnalysis(description: string): any {
    const lowerDesc = description.toLowerCase();
    const genres = [];
    const primary_keywords = [];
    const alternative_keywords = [];
    const specific_elements = [];
    let mood = 'exciting';
    let media_type = 'movie';
    let exact_titles = [];

    // Detect specific movie references
    if (lowerDesc.includes('benjamin button') || (lowerDesc.includes('born old') && lowerDesc.includes('young'))) {
      exact_titles.push('The Curious Case of Benjamin Button');
    }
    if (lowerDesc.includes('serial killer') || lowerDesc.includes('killer')) {
      genres.push('crime', 'thriller');
      primary_keywords.push('serial killer', 'investigation');
      alternative_keywords.push('murder', 'detective', 'psychological');
      mood = 'dark';
    }
    if (lowerDesc.includes('tv show') || lowerDesc.includes('series')) {
      media_type = 'tv';
    }
    if (lowerDesc.includes('action') || lowerDesc.includes('fight')) {
      genres.push('action');
      primary_keywords.push('action', 'fight');
      alternative_keywords.push('adventure', 'hero');
    }
    if (lowerDesc.includes('romance') || lowerDesc.includes('love')) {
      genres.push('romance');
      primary_keywords.push('romance', 'love');
      alternative_keywords.push('relationship', 'couple');
      mood = 'emotional';
    }
    if (lowerDesc.includes('comedy') || lowerDesc.includes('funny')) {
      genres.push('comedy');
      primary_keywords.push('comedy', 'funny');
      alternative_keywords.push('humor', 'laugh');
      mood = 'funny';
    }
    if (lowerDesc.includes('horror') || lowerDesc.includes('scary')) {
      genres.push('horror');
      primary_keywords.push('horror', 'scary');
      alternative_keywords.push('thriller', 'fear');
      mood = 'dark';
    }
    if (lowerDesc.includes('sci-fi') || lowerDesc.includes('science fiction') || lowerDesc.includes('space')) {
      genres.push('science fiction');
      primary_keywords.push('sci-fi', 'science fiction');
      alternative_keywords.push('space', 'future', 'technology');
    }

    // Extract specific elements from description
    const words = lowerDesc.split(/\s+/);
    for (const word of words) {
      if (word.length > 4 && !['movie', 'film', 'show', 'series', 'about', 'with', 'that', 'have', 'been', 'this', 'they', 'will', 'from'].includes(word)) {
        specific_elements.push(word);
      }
    }

    return {
      exact_titles,
      genres: genres.length > 0 ? genres : ['drama'],
      primary_keywords: primary_keywords.length > 0 ? primary_keywords : specific_elements.slice(0, 3),
      alternative_keywords: alternative_keywords.length > 0 ? alternative_keywords : ['popular', 'acclaimed'],
      specific_elements: specific_elements.slice(0, 5),
      mood,
      media_type,
      era: 'any',
      explanation: "Analyzed your request and searching across the full movie and TV database.",
      confidence: 75
    };
  }

  private getFallbackMoodAnalysis(mood: string): any {
    const moodMap: { [key: string]: { genres: string[], keywords: string[] } } = {
      'dark': { genres: ['thriller', 'horror', 'crime'], keywords: ['dark', 'thriller', 'mystery'] },
      'uplifting': { genres: ['comedy', 'adventure', 'family'], keywords: ['feel good', 'comedy', 'adventure'] },
      'thoughtful': { genres: ['drama', 'science fiction'], keywords: ['drama', 'thoughtful', 'deep'] },
      'exciting': { genres: ['action', 'adventure'], keywords: ['action', 'exciting', 'adventure'] },
      'emotional': { genres: ['drama', 'romance'], keywords: ['emotional', 'drama', 'touching'] },
      'funny': { genres: ['comedy'], keywords: ['comedy', 'funny', 'hilarious'] }
    };

    return moodMap[mood.toLowerCase()] || moodMap['exciting'];
  }

  private async getFallbackRecommendations(query: AIQuery): Promise<RecommendationResult> {
    const popularResults = await tmdbService.getPopularMovies();
    
    return {
      movies: popularResults.results.slice(0, 6),
      explanation: "Here are some popular movies that might interest you. Our AI service is currently unavailable, but these are great options!",
      confidence: 60,
      tags: ['popular', 'trending']
    };
  }
}

export const geminiAI = new GeminiAIService();