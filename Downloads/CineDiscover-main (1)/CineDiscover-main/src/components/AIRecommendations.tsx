import { useState, useEffect, useCallback } from "react";
import { Brain, Sparkles, Send, Lightbulb, TrendingUp, Heart, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/lib/tmdb";
import { aiRecommendationEngine, RecommendationResult } from "@/lib/ai-recommendations";
import { intelligentEngine } from "@/lib/intelligent-recommendation-engine";
import EnhancedMovieCard from "./EnhancedMovieCard";

interface AIRecommendationsProps {
  onMoviesFound: (movies: Movie[], title: string) => void;
}

const AIRecommendations = ({ onMoviesFound }: AIRecommendationsProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [performanceStats, setPerformanceStats] = useState<any>(null);

  const suggestions = [
    "🎬 Movie about a man who ages backwards",
    "📺 TV shows about criminal investigations", 
    "🚀 Sci-fi films with time travel plots",
    "💝 Romantic comedies from the 90s",
    "🔍 Dark crime thrillers like Seven",
    "🎭 Movies that make you cry",
    "⚡ Action movies with car chases",
    "🎪 Feel-good Disney animated films",
    "🤖 Movies about artificial intelligence",
    "🏰 Fantasy adventures like Lord of the Rings",
    "👻 Horror movies from the 80s",
    "🕵️ Detective shows like Sherlock Holmes"
  ];

  const moodButtons = [
    { mood: "dark", icon: "🌙", label: "Dark & Mysterious" },
    { mood: "uplifting", icon: "☀️", label: "Uplifting & Fun" },
    { mood: "thoughtful", icon: "🧠", label: "Thoughtful & Deep" },
    { mood: "exciting", icon: "⚡", label: "Exciting & Thrilling" }
  ];

  // Enhanced search with better AI and performance tracking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const startTime = performance.now();
    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      // Try intelligent engine first for better results
      let recommendation;
      let usingIntelligentEngine = false;
      
      try {
        console.log('🧠 Using Intelligent ML Engine for query:', query.trim());
        const intelligentResult = await intelligentEngine.getIntelligentRecommendations(query.trim());
        
        // Convert intelligent result to standard format
        recommendation = {
          movies: intelligentResult.movies,
          explanation: intelligentResult.explanation,
          confidence: intelligentResult.confidence,
          tags: intelligentResult.tags,
          searchMetadata: {
            queryProcessingTime: intelligentResult.context.processingTime,
            searchStrategy: 'intelligent-ml-analysis',
            totalResults: intelligentResult.movies.length,
            confidenceFactors: intelligentResult.reasoning,
            fallbackUsed: false,
            aiModelUsed: 'intelligent-ml-engine',
            semanticMatchScore: intelligentResult.confidence
          }
        };
        usingIntelligentEngine = true;
        
      } catch (intelligentError) {
        console.log('🔄 Intelligent engine failed, using enhanced Gemini AI:', intelligentError);
        
        // Fallback to enhanced Gemini AI
        recommendation = await aiRecommendationEngine.analyzeQuery({
          description: query.trim()
        });
      }
      
      const searchTime = performance.now() - startTime;
      
      setResult(recommendation);
      onMoviesFound(recommendation.movies, "Enhanced AI Recommendations");
      
      // Track performance stats with engine info
      setPerformanceStats({
        searchTime: Math.round(searchTime),
        confidence: recommendation.confidence,
        resultsCount: recommendation.movies.length,
        strategy: usingIntelligentEngine ? 'intelligent-ml' : (recommendation.searchMetadata?.searchStrategy || 'enhanced-ai')
      });
      
      console.log('🔍 Enhanced AI Search completed:', {
        query: query.trim(),
        engine: usingIntelligentEngine ? 'Intelligent ML Engine' : 'Enhanced Gemini AI',
        resultsFound: recommendation.movies.length,
        confidence: recommendation.confidence,
        searchTime: Math.round(searchTime) + 'ms',
        reasoning: recommendation.searchMetadata?.confidenceFactors || []
      });
      
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      // Fallback to ensure the app doesn't break
      setResult({
        movies: [],
        explanation: "Search encountered an issue. Please try a different query.",
        confidence: 0,
        tags: ['error'],
        searchMetadata: {
          queryProcessingTime: 0,
          searchStrategy: 'fallback',
          totalResults: 0,
          confidenceFactors: [],
          fallbackUsed: true,
          aiModelUsed: 'fallback',
          semanticMatchScore: 0
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic search suggestions
  const generateSearchSuggestions = useCallback(async (partialQuery: string) => {
    if (partialQuery.length > 2) {
      try {
        const suggestions = await aiRecommendationEngine.getSearchSuggestions(partialQuery);
        setSearchSuggestions(suggestions);
      } catch (error) {
        console.error('Failed to get search suggestions:', error);
      }
    } else {
      setSearchSuggestions([]);
    }
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length > 2) {
        generateSearchSuggestions(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, generateSearchSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion.substring(2)); // Remove emoji
    setShowSuggestions(false);
  };

  const handleMoodClick = async (mood: string) => {
    const startTime = performance.now();
    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      console.log('🎯 Intelligent Mood Search for:', mood);
      
      // Use the intelligent engine for mood-based recommendations
      const intelligentResult = await intelligentEngine.getIntelligentRecommendations(mood);
      
      const searchTime = performance.now() - startTime;
      
      // Convert to compatible format
      const result: RecommendationResult = {
        movies: intelligentResult.movies,
        explanation: intelligentResult.explanation,
        confidence: intelligentResult.confidence,
        tags: intelligentResult.tags,
        searchMetadata: {
          queryProcessingTime: searchTime,
          searchStrategy: 'intelligent-mood-analysis',
          totalResults: intelligentResult.movies.length,
          confidenceFactors: intelligentResult.reasoning,
          fallbackUsed: false,
          aiModelUsed: 'intelligent-ml-engine',
          semanticMatchScore: intelligentResult.confidence
        }
      };
      
      setResult(result);
      onMoviesFound(intelligentResult.movies, `${mood.charAt(0).toUpperCase() + mood.slice(1)} - Intelligent Recommendations`);
      
      // Update performance stats
      setPerformanceStats({
        searchTime: Math.round(searchTime),
        confidence: intelligentResult.confidence,
        resultsCount: intelligentResult.movies.length,
        strategy: 'intelligent-ml'
      });
      
      console.log('✅ Intelligent Mood Analysis completed:', {
        mood,
        intent: intelligentResult.context.userIntent,
        resultsFound: intelligentResult.movies.length,
        confidence: intelligentResult.confidence,
        reasoning: intelligentResult.reasoning
      });
      
    } catch (error) {
      console.error('Error getting intelligent mood recommendations:', error);
      
      // Fallback to ensure the app doesn't break
      try {
        const fallbackMovies = await aiRecommendationEngine.getMoodBasedRecommendations(mood);
        const fallbackResult: RecommendationResult = {
          movies: fallbackMovies,
          explanation: `Here are some ${mood} movies (using fallback system).`,
          confidence: 70,
          tags: [mood, 'fallback']
        };
        setResult(fallbackResult);
        onMoviesFound(fallbackMovies, `${mood.charAt(0).toUpperCase() + mood.slice(1)} Movies`);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Search Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-card backdrop-blur-lg rounded-full border border-primary/40 shadow-glow">
          <div className="relative">
            <Brain className="w-6 h-6 text-primary animate-pulse" />
            <div className="absolute inset-0 blur-md bg-primary/50 rounded-full" />
          </div>
          <span className="text-lg font-semibold gradient-text">AI Movie Discovery</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black gradient-text glow-text font-orbitron">
          Intelligent ML Movie Discovery Engine
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
          Advanced Machine Learning algorithms that truly understand your mood and preferences. 
          Intelligent genre filtering ensures perfect matches every time.
        </p>
        
        {/* Performance & Intelligence Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
            <Brain className="w-3 h-3 mr-1" />
            ML Intelligence
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/40">
            <Zap className="w-3 h-3 mr-1" />
            Smart Filtering
          </Badge>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/40">
            <Heart className="w-3 h-3 mr-1" />
            Mood Aware
          </Badge>
        </div>
      </div>

      {/* AI Search Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative group">
          <Input
            type="text"
            placeholder="e.g., 'movie about a man who ages backwards' or 'TV show about serial killers' or 'that sci-fi film with the spinning hallway'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input w-full pl-6 pr-16 py-4 rounded-2xl text-foreground font-medium text-lg min-h-[60px] font-inter"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 neon-button px-4 py-2 rounded-xl"
          >
            {isLoading ? (
              <Brain className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        {/* Dynamic Search Suggestions */}
        {searchSuggestions.length > 0 && query.length > 2 && (
          <div className="absolute top-full mt-2 w-full bg-gradient-card backdrop-blur-md border border-border/40 rounded-xl shadow-glow z-10">
            <div className="p-2">
              <p className="text-xs text-muted-foreground mb-2">Smart suggestions:</p>
              {searchSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className="w-full text-left p-2 rounded-lg hover:bg-background/50 text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Quick Mood Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {moodButtons.map((item) => (
          <Button
            key={item.mood}
            variant="outline"
            onClick={() => handleMoodClick(item.mood)}
            disabled={isLoading}
            className="bg-gradient-card backdrop-blur-md border-border/60 hover:border-primary/60 transition-all duration-300 font-inter"
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <Card className="bg-gradient-card backdrop-blur-md border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Lightbulb className="w-5 h-5 text-electric" />
              Try These Exact Searches
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Describe any movie plot or character - I'll find the exact title from 1M+ movies & TV shows
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 rounded-xl bg-background/50 hover:bg-background/80 border border-border/40 hover:border-primary/60 transition-all duration-300 text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Statistics */}
      {performanceStats && (
        <Card className="bg-gradient-card backdrop-blur-md border-border/40 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-primary" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{performanceStats.searchTime}ms</div>
                <div className="text-xs text-muted-foreground">Search Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{performanceStats.confidence}%</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{performanceStats.resultsCount}</div>
                <div className="text-xs text-muted-foreground">Results</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{performanceStats.strategy}</div>
                <div className="text-xs text-muted-foreground">AI Engine</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Results */}
      {result && (
        <Card className="bg-gradient-card backdrop-blur-md border-border/40 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-primary" />
              Advanced AI Analysis Results
              <Badge variant="outline" className="ml-auto">
                {result.confidence}% match
              </Badge>
            </CardTitle>
            {result.searchMetadata && (
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  Strategy: {result.searchMetadata.searchStrategy}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Processing: {Math.round(result.searchMetadata.queryProcessingTime)}ms
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Model: {result.searchMetadata.aiModelUsed}
                </Badge>
                {result.searchMetadata.semanticMatchScore && (
                  <Badge variant="secondary" className="text-xs">
                    ML Score: {Math.round(result.searchMetadata.semanticMatchScore)}%
                  </Badge>
                )}
              </div>
            )}
            
            {/* Show AI Reasoning if available */}
            {result.searchMetadata?.confidenceFactors && result.searchMetadata.confidenceFactors.length > 0 && (
              <div className="mt-4 p-3 bg-background/30 rounded-lg border border-border/20">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  AI Reasoning
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {result.searchMetadata.confidenceFactors.slice(0, 4).map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {result.explanation}
            </p>
            
            {result.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-primary/20 text-primary border-primary/40"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {result.movies.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Your Perfect Matches
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {result.movies.slice(0, 3).map((movie, index) => (
                    <div
                      key={movie.id}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <EnhancedMovieCard movie={movie} showActions={false} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIRecommendations;