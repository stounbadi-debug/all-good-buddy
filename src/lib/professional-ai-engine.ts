// Compatibility shim for the legacy Professional AI Engine
// Keeps the same API while delegating to the new modular AI service
import { aiService } from './ai/ai-service';

export interface ProfessionalAIRequest {
  query: string;
  mode?: 'intelligent' | 'professional' | 'demo' | 'comprehensive';
  preferences?: {
    quality_focus?: boolean;
    speed_focus?: boolean;
    accuracy_focus?: boolean;
    demo_mode?: boolean;
  };
}

export interface ProfessionalAIResponse {
  movies: any[];
  explanation: string;
  confidence: number;
  processing_time: number;
  engines_used: string[];
  professional_features: string[];
  demo_highlights: string[];
  intelligence_score: number;
  quality_metrics: {
    imdb_enhanced: number;
    professional_scored: number;
    ai_analyzed: number;
    total_intelligence_points: number;
  };
}

class ProfessionalAIEngineShim {
  async processIntelligentRequest(request: ProfessionalAIRequest): Promise<ProfessionalAIResponse> {
    const result = await aiService.searchMovies(request.query, {
      mode: request.mode || 'intelligent',
      preferences: request.preferences,
    });

    return {
      movies: result.movies,
      explanation: result.explanation,
      confidence: result.confidence,
      processing_time: result.processing_time,
      engines_used: result.engines_used,
      professional_features: result.professional_features,
      demo_highlights: request.preferences?.demo_mode ? ['Demo mode enabled'] : [],
      intelligence_score: result.intelligence_score,
      quality_metrics: result.quality_metrics,
    };
  }
}

export const professionalAI = new ProfessionalAIEngineShim();
