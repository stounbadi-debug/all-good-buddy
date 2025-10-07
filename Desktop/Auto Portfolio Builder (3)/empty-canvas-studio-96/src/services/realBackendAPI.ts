import axios from 'axios';
import { PersonProfile } from '@/utils/LLMService';

export interface BackendProfileData extends PersonProfile {
  processingTime?: number;
  stats?: any;
}

export interface ApiResponse {
  success: boolean;
  data?: BackendProfileData;
  error?: string;
  message?: string;
  stats?: any;
}

export interface BackendStatus {
  healthy: boolean;
  error?: string;
}

class RealBackendAPI {
  private client = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async getBackendStatus(): Promise<BackendStatus> {
    try {
      const response = await this.client.get('/api/health');
      return { healthy: response.data.status === 'healthy' };
    } catch (error: any) {
      return { healthy: false, error: error.message || 'Backend not reachable' };
    }
  }

  async runPipeline(url: string, industry: string = 'entertainment'): Promise<ApiResponse> {
    try {
      console.log('🚀 Calling backend API...', { url, industry });
      const response = await this.client.post('/api/run', { url, industry });
      
      console.log('✅ Backend response received:', response.data);
      const backendData = response.data.finalProfile;

      const frontendProfile: BackendProfileData = {
        name: backendData.name || 'Unknown',
        description: backendData.description || backendData.biography || 'No description available.',
        jobTitle: backendData.jobTitle || backendData.occupation || 'N/A',
        company: backendData.worksFor?.name || backendData.company || 'N/A',
        location: backendData.address?.addressLocality || backendData.location || backendData.birthPlace || 'N/A',
        image: backendData.image || 'https://via.placeholder.com/150',
        skills: backendData.skills || [],
        projects: backendData.projects || [],
        experience: backendData.workExperience || backendData.experience || [],
        
        // Enhanced IMDB fields
        knownFor: backendData.knownFor || [],
        filmography: backendData.filmography || backendData.credits || [],
        awards: backendData.awards || [],
        personalDetails: {
          birthYear: backendData.birthDate || backendData.personalDetails?.birthYear,
          birthPlace: backendData.birthPlace || backendData.personalDetails?.birthPlace,
          height: backendData.height || backendData.personalDetails?.height,
          relatives: backendData.relatives || backendData.personalDetails?.relatives || [],
        },
        trivia: backendData.trivia || [],
        biography: backendData.biography || backendData.description,
        
        generatedAt: new Date().toISOString(),
        sourceUrl: url,
        confidence: backendData.confidence || 0.85,
        processingTime: response.data.stats?.totalTime || 0,
        stats: response.data.stats,
      };

      return { 
        success: true, 
        data: frontendProfile, 
        message: 'Profile generated successfully with backend API', 
        stats: response.data.stats 
      };
    } catch (error: any) {
      console.error('Backend pipeline error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.error || error.message || 'Backend processing failed' 
      };
    }
  }
}

export const realBackendAPI = new RealBackendAPI();
