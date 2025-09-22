import { useState } from 'react';
import { Search, Sparkles, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAISearch?: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  showAIToggle?: boolean;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  onAISearch, 
  placeholder = "Search movies, actors, genres...",
  isLoading = false,
  showAIToggle = true,
  className = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [useAI, setUseAI] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (useAI && onAISearch) {
      onAISearch(query);
    } else {
      onSearch(query);
    }
  };

  const suggestions = [
    "Action movies with robots",
    "Romantic comedies from the 90s", 
    "Movies like Inception",
    "Feel-good animated films",
    "Dark psychological thrillers",
    "Space adventure movies"
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-glow opacity-0 group-focus-within:opacity-30 rounded-2xl blur-xl transition-all duration-500" />
          
          <div className="relative flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder={useAI ? "Describe what you're looking for..." : placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input pl-12 pr-16 py-4 rounded-2xl text-lg font-medium border-border/40 focus:border-primary/60"
                disabled={isLoading}
              />
              
              {/* Voice Input Button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 hover:bg-primary/10"
                disabled={isLoading}
              >
                <Mic className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </Button>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`px-8 py-4 rounded-2xl font-bold shadow-glow hover:shadow-elevated transition-all duration-300 ${
                useAI ? 'neon-button' : 'bg-gradient-card backdrop-blur-md border border-border/60 hover:border-primary/60 text-foreground'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
              ) : useAI ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Search
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        {/* AI Toggle and Quick Suggestions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {showAIToggle && onAISearch && (
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUseAI(!useAI)}
                className={`bg-background/50 backdrop-blur-md border-border/60 transition-all duration-300 ${
                  useAI ? 'border-primary/60 bg-primary/10 text-primary' : 'hover:border-primary/40'
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {useAI ? 'AI Mode ON' : 'Try AI Search'}
              </Button>
              
              {useAI && (
                <span className="text-sm text-muted-foreground">
                  Use natural language to describe what you want
                </span>
              )}
            </div>
          )}
          
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 bg-background/50 backdrop-blur-md border border-border/40 rounded-full text-xs text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-300"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;