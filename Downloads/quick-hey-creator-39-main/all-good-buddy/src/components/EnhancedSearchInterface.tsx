// Enhanced Search Interface with AI-powered movie discovery
import { useState, useCallback } from 'react';
import { Search, Brain, Sparkles, Zap, Film } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Movie } from '@/lib/tmdb';
import { useToast } from '@/hooks/use-toast';
import { workingGeminiSearch } from '@/lib/working-gemini-search';

interface EnhancedSearchInterfaceProps {
  onMoviesFound: (movies: Movie[], explanation: string) => void;
  isLoading: boolean;
}

export default function EnhancedSearchInterface({ 
  onMoviesFound, 
  isLoading 
}: EnhancedSearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('natural');
  const { toast } = useToast();

  const handleNaturalSearch = useCallback(async () => {
    if (!query.trim()) return;

    try {
      console.log('🎯 Natural language search:', query);
      const result = await workingGeminiSearch.analyzeAndSearch(query);
      
      if (result.movies.length > 0) {
        onMoviesFound(result.movies, result.explanation);
        toast({
          title: "AI Discovery Success!",
          description: `Found ${result.movies.length} perfect matches for your request.`,
          duration: 4000
        });
      } else {
        toast({
          title: "No matches found",
          description: "Try rephrasing your request or being more specific.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Natural search failed:', error);
      toast({
        title: "Search Error",
        description: "AI search failed. Please try again or use basic search.",
        variant: "destructive"
      });
    }
  }, [query, onMoviesFound, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'natural') {
      handleNaturalSearch();
    }
  };

  const quickPrompts = [
    "Movies that challenge my understanding",
    "Something uplifting and heartwarming",
    "Complex psychological thrillers",
    "Movies about time and identity",
    "Feel-good comedies to cheer me up",
    "Dark and thought-provoking films"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black gradient-text glow-text mb-4 font-orbitron">
          AI Movie Discovery
        </h2>
        <p className="text-lg text-muted-foreground font-light">
          Describe what you're in the mood for, and our AI will find the perfect movies
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-gradient-card backdrop-blur-md border border-border/40 p-1 rounded-2xl">
            <TabsTrigger 
              value="natural" 
              className="px-6 py-3 rounded-xl font-bold data-[state=active]:bg-gradient-button"
            >
              <Brain className="w-4 h-4 mr-2" />
              Natural Language
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="natural" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-glow opacity-0 group-focus-within:opacity-30 rounded-2xl blur-xl transition-all duration-500" />
              <div className="relative flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="text"
                    placeholder="e.g., 'Movies that challenge my understanding' or 'Something uplifting'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input pl-12 pr-4 py-4 rounded-2xl text-lg font-medium"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="neon-button px-8 py-4 rounded-2xl font-bold shadow-glow hover:shadow-elevated"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Discover
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Prompts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-muted-foreground">
              Or try these popular searches:
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(prompt)}
                  className="px-4 py-2 bg-gradient-card backdrop-blur-md border border-border/40 rounded-xl text-sm font-medium text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Features Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-gradient-card backdrop-blur-md border border-border/40 rounded-2xl">
              <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-2">Emotional Intelligence</h4>
              <p className="text-sm text-muted-foreground">
                AI understands your mood and emotional needs
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-card backdrop-blur-md border border-border/40 rounded-2xl">
              <Zap className="w-8 h-8 text-electric mx-auto mb-3" />
              <h4 className="font-bold mb-2">Theme Recognition</h4>
              <p className="text-sm text-muted-foreground">
                Identifies complex themes and storytelling patterns
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-card backdrop-blur-md border border-border/40 rounded-2xl">
              <Film className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold mb-2">Perfect Matching</h4>
              <p className="text-sm text-muted-foreground">
                Finds movies that truly resonate with your request
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}