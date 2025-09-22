// Mock API implementations for development
export class MockAPI {
  // Mock Gemini API
  static async callGemini(prompt: string, systemInstruction?: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock response based on prompt
    if (prompt.toLowerCase().includes('movie') || prompt.toLowerCase().includes('film')) {
      return `Based on your request about "${prompt.substring(0, 50)}...", here are some movie recommendations that match your criteria. This is a mock response for development.`;
    }
    
    return `Mock AI response for: "${prompt.substring(0, 50)}..." - This would normally be processed by Gemini AI.`;
  }

  // Mock Theme Analysis API
  static async analyzeThemes(query: string): Promise<{
    themes: string[];
    mood: string;
    analysis: string;
    confidence: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      themes: ['adventure', 'coming-of-age', 'friendship', 'drama'],
      mood: 'optimistic',
      analysis: `Theme analysis for "${query.substring(0, 50)}..." - Mock analysis result.`,
      confidence: 0.85
    };
  }

  // Check if we're in development mode
  static isDevelopment(): boolean {
    return import.meta.env.DEV || !import.meta.env.VITE_GEMINI_API_KEY;
  }
}