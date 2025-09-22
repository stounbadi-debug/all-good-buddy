// Movie Search Engine - Unified Search System
import { Movie, tmdbService } from '../tmdb';
import { workingGeminiSearch } from '../working-gemini-search';
import { AIRequest, AIResponse, professionalAICore } from './professional-ai-core';

export class MovieSearchEngine {
  async searchMovies(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    console.log('🎬 Movie Search Engine processing:', request.query);

    try {
      let movies: Movie[] = [];
      let explanation = '';
      let confidence = 80;
      let enginesUsed: string[] = [];

      // Strategy 1: Try Gemini AI understanding first
      try {
        console.log('🧠 Attempting Gemini AI analysis...');
        const geminiResult = await workingGeminiSearch.analyzeAndSearch(request.query);
        
        if (geminiResult.movies.length > 0) {
          movies = geminiResult.movies;
          explanation = geminiResult.explanation;
          confidence = geminiResult.confidence;
          enginesUsed.push('Gemini AI', 'TMDB');
          console.log('✅ Gemini AI successful!');
        }
      } catch (error) {
        console.log('⚠️ Gemini AI unavailable, using TMDB direct search');
      }

      // Strategy 2: Fallback to direct TMDB search
      if (movies.length === 0) {
        console.log('🔍 Using direct TMDB search...');
        const tmdbResults = await tmdbService.searchMovies(request.query);
        movies = tmdbResults.results.slice(0, 12);
        explanation = `🔍 Found ${movies.length} movies matching "${request.query}"`;
        enginesUsed.push('TMDB');
      }

      // Enhance movies with professional scoring
      const enhancedMovies = this.enhanceMovies(movies);
      
      const processingTime = Date.now() - startTime;
      professionalAICore.updateStats(processingTime, enginesUsed);

      const response: AIResponse = {
        movies: enhancedMovies,
        explanation,
        confidence,
        processing_time: processingTime,
        engines_used: enginesUsed,
        professional_features: this.getProfessionalFeatures(enginesUsed),
        intelligence_score: Math.min(confidence + 10, 95),
        quality_metrics: professionalAICore.calculateQualityMetrics(enhancedMovies)
      };

      console.log(`✅ Search complete in ${processingTime}ms`);
      return response;

    } catch (error) {
      console.error('❌ Movie search failed:', error);
      return professionalAICore.createFallbackResponse(request.query, Date.now() - startTime);
    }
  }

  private enhanceMovies(movies: Movie[]): Movie[] {
    return movies.map(movie => ({
      ...movie,
      professional_score: this.calculateProfessionalScore(movie),
      intelligence_tags: this.generateIntelligenceTags(movie)
    }));
  }

  private calculateProfessionalScore(movie: Movie): number {
    const voteScore = movie.vote_average * 10;
    const popularityScore = Math.min(movie.popularity / 100, 30);
    const releaseScore = movie.release_date ? 20 : 0;
    
    return Math.round(voteScore + popularityScore + releaseScore);
  }

  private generateIntelligenceTags(movie: Movie): string[] {
    const tags: string[] = [];
    
    if (movie.vote_average >= 8) tags.push('Highly Rated');
    if (movie.popularity > 50) tags.push('Popular');
    if (movie.release_date && new Date(movie.release_date).getFullYear() >= 2020) {
      tags.push('Recent');
    }
    if (movie.overview?.length > 200) tags.push('Detailed');
    
    return tags;
  }

  private getProfessionalFeatures(enginesUsed: string[]): string[] {
    const features = ['Professional Search Engine', 'Smart Movie Analysis'];
    
    if (enginesUsed.includes('Gemini AI')) {
      features.push('AI Understanding', 'Intelligent Query Processing');
    }
    if (enginesUsed.includes('TMDB')) {
      features.push('Comprehensive Database', 'Real-time Data');
    }
    
    return features;
  }
}

export const movieSearchEngine = new MovieSearchEngine();