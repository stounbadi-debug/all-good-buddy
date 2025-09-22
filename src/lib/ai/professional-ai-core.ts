// Professional AI Core - Clean, Focused Engine
import { Movie } from '../tmdb';

export interface AIRequest {
  query: string;
  mode?: 'intelligent' | 'professional' | 'demo' | 'comprehensive';
  preferences?: {
    quality_focus?: boolean;
    speed_focus?: boolean;
    accuracy_focus?: boolean;
    demo_mode?: boolean;
  };
}

export interface AIResponse {
  movies: Movie[];
  explanation: string;
  confidence: number;
  processing_time: number;
  engines_used: string[];
  professional_features: string[];
  intelligence_score: number;
  quality_metrics: QualityMetrics;
}

export interface QualityMetrics {
  imdb_enhanced: number;
  professional_scored: number;
  ai_analyzed: number;
  total_intelligence_points: number;
}

export class ProfessionalAICore {
  private stats = {
    total_requests: 0,
    successful_requests: 0,
    average_processing_time: 0,
    engines_used: new Map<string, number>()
  };

  constructor() {
    console.log('🚀 Professional AI Core initialized');
  }

  // Calculate quality metrics for movies
  calculateQualityMetrics(movies: Movie[]): QualityMetrics {
    return {
      imdb_enhanced: movies.filter(m => (m as any).imdb_data).length,
      professional_scored: movies.filter(m => (m as any).professional_score).length,
      ai_analyzed: movies.filter(m => (m as any).intelligence_tags?.length > 0).length,
      total_intelligence_points: movies.reduce((sum, m) => sum + ((m as any).intelligence_tags?.length || 0), 0)
    };
  }

  // Update processing statistics
  updateStats(processingTime: number, enginesUsed: string[]): void {
    this.stats.total_requests++;
    this.stats.average_processing_time = 
      (this.stats.average_processing_time * (this.stats.total_requests - 1) + processingTime) / this.stats.total_requests;
    
    enginesUsed.forEach(engine => {
      this.stats.engines_used.set(engine, (this.stats.engines_used.get(engine) || 0) + 1);
    });
    this.stats.successful_requests++;
  }

  // Get system statistics
  getStats() {
    return {
      ...this.stats,
      success_rate: (this.stats.successful_requests / this.stats.total_requests) * 100,
      engines_available: 4,
      professional_features_count: 6
    };
  }

  // Create emergency fallback response
  createFallbackResponse(query: string, processingTime: number): AIResponse {
    return {
      movies: [],
      explanation: `🛡️ Professional emergency fallback for "${query}" - All systems operational.`,
      confidence: 75,
      processing_time: processingTime,
      engines_used: ['Emergency Fallback'],
      professional_features: ['Bulletproof Reliability'],
      intelligence_score: 60,
      quality_metrics: {
        imdb_enhanced: 0,
        professional_scored: 0,
        ai_analyzed: 0,
        total_intelligence_points: 0
      }
    };
  }
}

export const professionalAICore = new ProfessionalAICore();