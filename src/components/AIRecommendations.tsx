import { useState } from "react";
import { Brain, Sparkles, Send, Lightbulb, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/lib/tmdb";
import { aiRecommendationEngine, RecommendationResult } from "@/lib/ai-recommendations";
import EnhancedMovieCard from "./EnhancedMovieCard";

interface AIRecommendationsProps {
  onMoviesFound: (movies: Movie[], title: string) => void;
}

const AIRecommendations = ({ onMoviesFound }: AIRecommendationsProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      const recommendation = await aiRecommendationEngine.analyzeQuery({
        description: query
      });
      
      setResult(recommendation);
      onMoviesFound(recommendation.movies, "AI Recommendations");
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion.substring(2)); // Remove emoji
    setShowSuggestions(false);
  };

  const handleMoodClick = async (mood: string) => {
    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      const movies = await aiRecommendationEngine.getMoodBasedRecommendations(mood);
      const result: RecommendationResult = {
        movies,
        explanation: `Here are some ${mood} movies selected based on your mood preference.`,
        confidence: 85,
        tags: [mood]
      };
      
      setResult(result);
      onMoviesFound(movies, `${mood.charAt(0).toUpperCase() + mood.slice(1)} Movies`);
    } catch (error) {
      console.error('Error getting mood recommendations:', error);
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
          Discover from Entire Movie & TV Database
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
          Access the complete TMDB library with 1M+ movies & TV shows. Describe any plot, character, or movie you remember - I'll find the exact title or similar content
        </p>
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

      {/* AI Results */}
      {result && (
        <Card className="bg-gradient-card backdrop-blur-md border-border/40 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-primary" />
              AI Analysis Results
              <Badge variant="outline" className="ml-auto">
                {result.confidence}% match
              </Badge>
            </CardTitle>
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