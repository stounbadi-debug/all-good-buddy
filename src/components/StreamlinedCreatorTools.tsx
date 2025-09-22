// Streamlined Creator Tools - Focus on Core Business Value
// Essential collaboration and audience matching for maximum ROI

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Target, 
  DollarSign, 
  Star,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';

interface CreatorMatch {
  name: string;
  matchScore: number;
  audienceAlign: number;
  rateRange: string;
  pastROI: string;
  availability: string;
  keyStrengths: string[];
}

export function StreamlinedCreatorTools() {
  const [projectBudget, setProjectBudget] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matches, setMatches] = useState<CreatorMatch[]>([]);

  const mockMatches: CreatorMatch[] = [
    {
      name: 'Sarah Chen',
      matchScore: 94,
      audienceAlign: 91,
      rateRange: '$150K - $200K',
      pastROI: '+285%',
      availability: 'Available Q2 2025',
      keyStrengths: ['Social Media Growth', 'Young Adult Content', 'Brand Partnerships']
    },
    {
      name: 'Marcus Rivera',
      matchScore: 87,
      audienceAlign: 89,
      rateRange: '$180K - $250K',
      pastROI: '+203%',
      availability: 'Available Q3 2025',
      keyStrengths: ['Action Content', 'International Appeal', 'Streaming Success']
    },
    {
      name: 'Emma Thompson',
      matchScore: 83,
      audienceAlign: 86,
      rateRange: '$120K - $180K',
      pastROI: '+167%',
      availability: 'Available Now',
      keyStrengths: ['Character Development', 'Critical Acclaim', 'Award Track Record']
    }
  ];

  const handleAnalyze = () => {
    if (!projectBudget || !targetAudience) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setMatches(mockMatches);
      setIsAnalyzing(false);
    }, 1500);
  };

  const formatCurrency = (amount: string) => amount;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <div className="flex items-center justify-center gap-3">
          <div className="p-4 bg-gradient-to-br from-primary/20 to-electric/10 rounded-2xl border border-primary/20 shadow-lg animate-bounce-in">
            <Users className="w-8 h-8 text-primary animate-pulse-glow" />
          </div>
          <h1 className="text-4xl font-bold gradient-text animate-fade-in delay-200">
            Creator Intelligence & ROI Matching
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300 text-lg">
          AI-powered creator matching for maximum audience engagement and guaranteed ROI
        </p>
      </div>

      {/* Enhanced Project Input */}
      <Card className="max-w-3xl mx-auto shadow-xl border border-border/20 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-md animate-scale-in delay-200">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-electric/5 border-b border-border/10">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary animate-float" />
            Project Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className="text-sm font-semibold mb-2 block text-muted-foreground group-hover:text-foreground transition-colors">Project Budget</label>
              <Input
                placeholder="e.g., $2M - $5M"
                value={projectBudget}
                onChange={(e) => setProjectBudget(e.target.value)}
                className="search-input border-border/20 focus:border-primary/50 transition-all duration-300 group-hover:border-primary/30"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-semibold mb-2 block text-muted-foreground group-hover:text-foreground transition-colors">Target Audience</label>
              <Input
                placeholder="e.g., 18-34 Action/Adventure"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="search-input border-border/20 focus:border-primary/50 transition-all duration-300 group-hover:border-primary/30"
              />
            </div>
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={!projectBudget || !targetAudience || isAnalyzing}
            className="w-full md:w-auto neon-button px-8 py-3 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Analyzing Creators...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Find Optimal Creators
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Results */}
      {matches.length > 0 && (
        <div className="space-y-8 animate-slide-up">
          {/* Enhanced ROI Summary */}
          <Card className="bg-gradient-to-r from-green-50/10 via-green-100/10 to-green-50/10 border-green-500/20 shadow-lg backdrop-blur-md animate-bounce-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-3 animate-pulse-glow gradient-text">
                  Expected ROI: +218%
                </div>
                <p className="text-green-300 text-lg">
                  Based on similar projects with top-matched creators
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4 animate-bounce" />
                    <span>Industry-leading prediction accuracy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Creator Matches */}
          <div className="space-y-6 animate-fade-in delay-300">
            <h2 className="text-3xl font-semibold flex items-center gap-3 gradient-text">
              <Star className="h-8 w-8 text-primary animate-pulse-glow" />
              Top Creator Matches
            </h2>
            
            {matches.map((creator, index) => (
              <Card 
                key={creator.name} 
                className={`${index === 0 ? 'border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-lg' : 'hover:shadow-lg'} 
                           transition-all duration-500 hover:transform hover:scale-[1.02] border-border/20 backdrop-blur-md
                           animate-slide-in-left`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Creator Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold gradient-text">{creator.name}</h3>
                        {index === 0 && (
                          <Badge variant="default" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground animate-pulse-glow">
                            🏆 Best Match
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Match Score:</span>
                          <span className="font-bold text-primary">{creator.matchScore}%</span>
                        </div>
                        <Progress 
                          value={creator.matchScore} 
                          className="h-3 bg-muted/20 animate-slide-in-right" 
                          style={{ animationDelay: `${index * 300 + 500}ms` }}
                        />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Audience Alignment:</span>
                          <span className="font-bold text-electric">{creator.audienceAlign}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Financial & ROI */}
                    <div className="bg-gradient-to-br from-muted/10 to-transparent p-4 rounded-lg border border-border/10">
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                        <DollarSign className="h-5 w-5 text-gold animate-float" />
                        Investment & Returns
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between p-2 rounded bg-background/50">
                          <span className="text-muted-foreground">Rate Range:</span>
                          <span className="font-bold text-foreground">{creator.rateRange}</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                          <span className="text-green-400">Historical ROI:</span>
                          <span className="font-bold text-green-400 animate-pulse-glow">{creator.pastROI}</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-background/50">
                          <span className="text-muted-foreground">Availability:</span>
                          <span className="font-bold text-foreground">{creator.availability}</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Key Strengths */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-primary animate-bounce" />
                        Key Strengths
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {creator.keyStrengths.map((strength, strengthIndex) => (
                          <Badge 
                            key={strength} 
                            variant="outline" 
                            className="text-xs bg-gradient-to-r from-primary/10 to-electric/10 border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${index * 200 + strengthIndex * 100}ms` }}
                          >
                            {strength}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        className={`mt-6 w-full transition-all duration-300 hover:scale-105 ${
                          index === 0 
                            ? "neon-button" 
                            : "bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/20 hover:to-electric/20 border border-border/20 hover:border-primary/30"
                        }`}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Request Partnership
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Business Value Footer */}
      <Card className="bg-gradient-to-r from-primary/5 via-electric/5 to-gold/5 border border-primary/20 shadow-xl backdrop-blur-md animate-slide-up delay-500">
        <CardContent className="pt-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-3 animate-pulse-glow gradient-text">89%</div>
              <div className="font-semibold text-lg mb-1">Success Rate</div>
              <div className="text-sm text-muted-foreground">AI-matched partnerships</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-3 animate-pulse-glow gradient-text">$47M</div>
              <div className="font-semibold text-lg mb-1">Value Generated</div>
              <div className="text-sm text-muted-foreground">Through optimal creator matching</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-3 animate-pulse-glow gradient-text">3.2x</div>
              <div className="font-semibold text-lg mb-1">Average ROI</div>
              <div className="text-sm text-muted-foreground">vs. traditional casting</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}