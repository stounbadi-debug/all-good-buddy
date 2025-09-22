import { useState } from 'react';
import { Search, Brain, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aiService } from '@/lib/ai/ai-service';
import { AIResponse } from '@/lib/ai/professional-ai-core';
import { Movie } from '@/lib/tmdb';

export const AIMovieSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: 'happy', label: '😊 Happy', color: 'bg-yellow-500' },
    { id: 'excited', label: '🚀 Excited', color: 'bg-red-500' },
    { id: 'thoughtful', label: '🤔 Thoughtful', color: 'bg-purple-500' },
    { id: 'relaxed', label: '😌 Relaxed', color: 'bg-green-500' },
    { id: 'surprise me', label: '✨ Surprise Me', color: 'bg-primary' }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await aiService.searchMovies(query);
      setResult(response);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSearch = async (mood: string) => {
    setSelectedMood(mood);
    setLoading(true);
    try {
      const response = await aiService.getRecommendations(mood);
      setResult(response);
    } catch (error) {
      console.error('Mood search failed:', error);
    } finally {
      setLoading(false);
      setSelectedMood(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Interface */}
      <Card className="movie-card border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            AI Movie Discovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Search */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Describe what you're looking for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="search-input pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading || !query.trim()}
              className="neon-button"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </Button>
          </div>

          {/* Mood-based Quick Search */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Or choose your mood:</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood.id}
                  variant="outline"
                  onClick={() => handleMoodSearch(mood.id)}
                  disabled={loading}
                  className={`${
                    selectedMood === mood.id ? 'border-primary bg-primary/10' : 'border-border/40'
                  } hover:bg-accent transition-all duration-300`}
                >
                  {selectedMood === mood.id ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {mood.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="movie-card border-border/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-electric" />
                AI Results
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-primary/40 text-primary">
                  {result.confidence}% confidence
                </Badge>
                <Badge variant="outline" className="border-electric/40 text-electric">
                  {result.processing_time}ms
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* AI Explanation */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-foreground font-medium">{result.explanation}</p>
            </div>

            {/* Professional Features */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">AI Features Used:</p>
              <div className="flex flex-wrap gap-2">
                {result.professional_features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Movies Grid */}
            {result.movies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {result.movies.slice(0, 8).map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No movies found. Try a different search term.
              </div>
            )}

            {/* Quality Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/40">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{result.quality_metrics.ai_analyzed}</div>
                <div className="text-xs text-muted-foreground">AI Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-electric">{result.quality_metrics.professional_scored}</div>
                <div className="text-xs text-muted-foreground">Prof. Scored</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">{result.intelligence_score}</div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{result.engines_used.length}</div>
                <div className="text-xs text-muted-foreground">Engines</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Simple Movie Card Component
const MovieCard = ({ movie }: { movie: Movie }) => (
  <Card className="movie-card border-border/40 overflow-hidden">
    <div className="aspect-[2/3] relative overflow-hidden">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.svg'}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute top-2 right-2">
        <Badge className="bg-primary/90 text-primary-foreground">
          ⭐ {movie.vote_average.toFixed(1)}
        </Badge>
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="font-bold text-sm line-clamp-2 mb-2">{movie.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-3">{movie.overview}</p>
      {(movie as any).intelligence_tags && (
        <div className="flex flex-wrap gap-1 mt-2">
          {(movie as any).intelligence_tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);