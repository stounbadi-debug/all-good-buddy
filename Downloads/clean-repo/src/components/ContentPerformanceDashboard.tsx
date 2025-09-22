// Content Performance Prediction Dashboard
// AI-powered box office and streaming performance forecasting

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  BarChart3,
  Zap,
  Globe,
  Star,
  TrendingDown
} from 'lucide-react';

interface PerformancePrediction {
  boxOffice: {
    predicted: number;
    confidence: number;
    range: { min: number; max: number };
  };
  streaming: {
    viewershipScore: number;
    retentionRate: number;
    engagement: number;
  };
  demographics: {
    primaryAge: string;
    secondaryAge: string;
    genderSplit: { male: number; female: number };
    regions: string[];
  };
  timing: {
    optimalRelease: string;
    seasonality: string;
    competition: string;
  };
}

export default function ContentPerformanceDashboard() {
  const [contentTitle, setContentTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PerformancePrediction | null>(null);

  const mockPrediction: PerformancePrediction = {
    boxOffice: {
      predicted: 285000000,
      confidence: 87,
      range: { min: 210000000, max: 350000000 }
    },
    streaming: {
      viewershipScore: 92,
      retentionRate: 78,
      engagement: 85
    },
    demographics: {
      primaryAge: '18-34',
      secondaryAge: '35-49',
      genderSplit: { male: 52, female: 48 },
      regions: ['North America', 'Europe', 'Asia-Pacific']
    },
    timing: {
      optimalRelease: 'Summer (June-July)',
      seasonality: 'High summer demand',
      competition: 'Moderate - 2 major releases in window'
    }
  };

  const handleAnalyze = async () => {
    if (!contentTitle.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setPrediction(mockPrediction);
      setIsAnalyzing(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <div className="flex items-center justify-center gap-3">
          <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 shadow-lg animate-bounce-in">
            <BarChart3 className="w-8 h-8 text-primary animate-pulse-glow" />
          </div>
          <h1 className="text-4xl font-bold gradient-text animate-fade-in delay-200">
            Content Performance Prediction
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300 text-lg">
          AI-powered box office and streaming performance forecasting for data-driven content decisions
        </p>
      </div>

      {/* Enhanced Analysis Input */}
      <Card className="max-w-2xl mx-auto shadow-lg border border-border/20 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-md animate-scale-in delay-200">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary animate-float" />
            Content Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter movie/show title or concept..."
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              className="flex-1 search-input border-border/20 focus:border-primary/50 transition-all duration-300"
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={!contentTitle.trim() || isAnalyzing}
              className="neon-button px-6 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </div>
              ) : (
                'Predict Performance'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Results */}
      {prediction && (
        <div className="space-y-6 animate-slide-up">
          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border-border/20 bg-gradient-to-br from-card to-card/80 animate-bounce-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Box Office Prediction</p>
                    <p className="text-2xl font-bold text-green-600 gradient-text group-hover:scale-110 transition-transform duration-300">
                      {formatCurrency(prediction.boxOffice.predicted)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600 group-hover:animate-bounce" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    <Progress value={prediction.boxOffice.confidence} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground">
                      {prediction.boxOffice.confidence}% confidence
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border-border/20 bg-gradient-to-br from-card to-card/80 animate-bounce-in delay-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Streaming Score</p>
                    <p className="text-2xl font-bold text-blue-600 gradient-text group-hover:scale-110 transition-transform duration-300">
                      {prediction.streaming.viewershipScore}/100
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    {prediction.streaming.retentionRate}% retention rate
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border-border/20 bg-gradient-to-br from-card to-card/80 animate-bounce-in delay-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Target Audience</p>
                    <p className="text-2xl font-bold text-purple-600 gradient-text group-hover:scale-110 transition-transform duration-300">
                      {prediction.demographics.primaryAge}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600 group-hover:animate-spin" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    {prediction.demographics.genderSplit.male}M / {prediction.demographics.genderSplit.female}F split
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border-border/20 bg-gradient-to-br from-card to-card/80 animate-bounce-in delay-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Optimal Release</p>
                    <p className="text-2xl font-bold text-orange-600 gradient-text group-hover:scale-110 transition-transform duration-300">Summer</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600 group-hover:animate-bounce" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    {prediction.timing.competition}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Detailed Analysis */}
          <Tabs defaultValue="financial" className="space-y-4 animate-fade-in delay-400">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-md border border-border/20">
              <TabsTrigger value="financial" className="transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Financial Forecast</TabsTrigger>
              <TabsTrigger value="audience" className="transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Audience Insights</TabsTrigger>
              <TabsTrigger value="timing" className="transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Release Strategy</TabsTrigger>
              <TabsTrigger value="marketing" className="transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Marketing Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-4 animate-slide-up">
              <Card className="shadow-lg border border-border/20 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 animate-bounce" />
                    Revenue Projections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Box Office Range</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Conservative:</span>
                          <span className="font-medium">{formatCurrency(prediction.boxOffice.range.min)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Most Likely:</span>
                          <span className="font-medium text-green-600">{formatCurrency(prediction.boxOffice.predicted)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Optimistic:</span>
                          <span className="font-medium">{formatCurrency(prediction.boxOffice.range.max)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Streaming Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Viewership Score:</span>
                          <span className="font-medium">{prediction.streaming.viewershipScore}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Retention Rate:</span>
                          <span className="font-medium">{prediction.streaming.retentionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Engagement:</span>
                          <span className="font-medium">{prediction.streaming.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Demographic Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Age Demographics</h4>
                      <div className="space-y-2">
                        <Badge variant="default" className="mr-2">
                          Primary: {prediction.demographics.primaryAge}
                        </Badge>
                        <Badge variant="secondary">
                          Secondary: {prediction.demographics.secondaryAge}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Geographic Markets</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.demographics.regions.map(region => (
                          <Badge key={region} variant="outline">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Release Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Optimal Timing</h4>
                      <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                        <p className="font-medium text-green-700 dark:text-green-300">
                          {prediction.timing.optimalRelease}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {prediction.timing.seasonality}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Competition Analysis</h4>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          {prediction.timing.competition}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Marketing Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Recommended Marketing Strategy
                      </h4>
                      <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                        <li>• Focus on 18-34 demographic with social media campaigns</li>
                        <li>• Emphasize action and adventure themes in trailers</li>
                        <li>• Target summer movie-going audiences</li>
                        <li>• Leverage international appeal for global markets</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}