import { useState } from 'react';
import { Zap, Brain, Filter, Star, TrendingUp, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuickActionsProps {
  onSurpriseMe: () => void;
  onAIRecommendations: () => void;
  onTrending: () => void;
  onShowFilters: () => void;
  showFilters: boolean;
  isLoading?: boolean;
}

const QuickActions = ({ 
  onSurpriseMe, 
  onAIRecommendations, 
  onTrending, 
  onShowFilters, 
  showFilters,
  isLoading = false 
}: QuickActionsProps) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = (action: string, callback: () => void) => {
    setActiveAction(action);
    callback();
    setTimeout(() => setActiveAction(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <div className="bg-gradient-card backdrop-blur-md border border-border/40 rounded-2xl p-6 shadow-glow">
        <div className="text-center mb-6">
          <Badge className="mb-3 px-4 py-1 bg-primary/20 text-primary border-primary/40 font-bold">
            ⚡ Quick Discovery
          </Badge>
          <h3 className="text-2xl font-bold gradient-text mb-2">
            What are you in the mood for?
          </h3>
          <p className="text-muted-foreground">
            Choose your discovery method and let our AI find the perfect content
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => handleAction('trending', onTrending)}
            disabled={isLoading}
            className={`h-24 flex-col gap-2 bg-gradient-card backdrop-blur-md border border-border/60 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 ${
              activeAction === 'trending' ? 'border-primary/80 bg-primary/20' : ''
            }`}
            variant="outline"
          >
            <div className="relative">
              <TrendingUp className="w-6 h-6 text-electric" />
              {activeAction === 'trending' && (
                <div className="absolute inset-0 blur-md bg-electric/40 animate-pulse" />
              )}
            </div>
            <span className="font-bold text-sm">Trending Now</span>
          </Button>

          <Button
            onClick={() => handleAction('ai', onAIRecommendations)}
            disabled={isLoading}
            className={`h-24 flex-col gap-2 neon-button shadow-glow hover:shadow-elevated transition-all duration-300 ${
              activeAction === 'ai' ? 'shadow-elevated scale-105' : ''
            }`}
          >
            <div className="relative">
              <Brain className="w-6 h-6" />
              {activeAction === 'ai' && (
                <div className="absolute inset-0 blur-md bg-primary/40 animate-pulse" />
              )}
            </div>
            <span className="font-bold text-sm">AI Discovery</span>
          </Button>

          <Button
            onClick={() => handleAction('surprise', onSurpriseMe)}
            disabled={isLoading}
            className={`h-24 flex-col gap-2 bg-gradient-electric text-foreground hover:shadow-glow transition-all duration-300 ${
              activeAction === 'surprise' ? 'shadow-glow scale-105' : ''
            }`}
          >
            <div className="relative">
              <Shuffle className="w-6 h-6" />
              {activeAction === 'surprise' && (
                <div className="absolute inset-0 blur-md bg-gold/40 animate-pulse" />
              )}
            </div>
            <span className="font-bold text-sm">Surprise Me!</span>
          </Button>

          <Button
            onClick={() => handleAction('filters', onShowFilters)}
            disabled={isLoading}
            className={`h-24 flex-col gap-2 bg-gradient-card backdrop-blur-md border border-border/60 hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 ${
              showFilters ? 'border-accent/80 bg-accent/20' : ''
            } ${activeAction === 'filters' ? 'border-accent/80 bg-accent/20' : ''}`}
            variant="outline"
          >
            <div className="relative">
              <Filter className="w-6 h-6 text-accent" />
              {(activeAction === 'filters' || showFilters) && (
                <div className="absolute inset-0 blur-md bg-accent/40 animate-pulse" />
              )}
            </div>
            <span className="font-bold text-sm">
              {showFilters ? 'Hide Filters' : 'Smart Filters'}
            </span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/40">
          <div className="text-center">
            <div className="text-lg font-bold gradient-text">50M+</div>
            <div className="text-xs text-muted-foreground">Movies & Shows</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold gradient-text">99.9%</div>
            <div className="text-xs text-muted-foreground">AI Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold gradient-text">24/7</div>
            <div className="text-xs text-muted-foreground">Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;