// AI Service - Main Interface for Movie Discovery
import { movieSearchEngine } from './movie-search-engine';
import { AIRequest, AIResponse } from './professional-ai-core';

export class AIService {
  // Main movie search method
  async searchMovies(query: string, options?: Partial<AIRequest>): Promise<AIResponse> {
    const request: AIRequest = {
      query,
      mode: options?.mode || 'intelligent',
      preferences: {
        quality_focus: true,
        ...options?.preferences
      }
    };

    console.log('🎯 AI Service processing search:', query);
    return movieSearchEngine.searchMovies(request);
  }

  // Quick movie recommendations
  async getRecommendations(mood: string = 'surprise me'): Promise<AIResponse> {
    const queries = {
      'happy': 'feel good uplifting comedy movies',
      'sad': 'emotional dramatic heartwarming movies',
      'excited': 'action adventure thriller movies',
      'thoughtful': 'complex psychological mind-bending movies',
      'relaxed': 'calm peaceful romantic movies',
      'surprise me': 'hidden gems popular acclaimed movies'
    };

    const query = queries[mood as keyof typeof queries] || mood;
    return this.searchMovies(query, { mode: 'intelligent' });
  }

  // Advanced AI search with full features
  async advancedSearch(query: string): Promise<AIResponse> {
    return this.searchMovies(query, {
      mode: 'professional',
      preferences: {
        quality_focus: true,
        accuracy_focus: true
      }
    });
  }

  // Demo mode for presentations
  async demoSearch(query: string): Promise<AIResponse> {
    return this.searchMovies(query, {
      mode: 'demo',
      preferences: {
        demo_mode: true,
        quality_focus: true
      }
    });
  }
}

export const aiService = new AIService();