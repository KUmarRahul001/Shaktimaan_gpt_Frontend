import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: any;
  private rateLimiter: {
    tokens: number;
    lastReset: number;
  };

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.rateLimiter = {
      tokens: 60,
      lastReset: Date.now(),
    };
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private resetRateLimit() {
    const now = Date.now();
    if (now - this.rateLimiter.lastReset >= 60000) {
      this.rateLimiter.tokens = 60;
      this.rateLimiter.lastReset = now;
    }
  }

  private async checkRateLimit() {
    this.resetRateLimit();
    if (this.rateLimiter.tokens <= 0) {
      throw new Error('Rate limit exceeded. Please try again in a minute.');
    }
    this.rateLimiter.tokens--;
  }

  public async generateResponse(prompt: string): Promise<string> {
    try {
      await this.checkRateLimit();

      const result = await Promise.race([
        this.model.generateContent(prompt),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), 30000)
        ),
      ]);

      const response = await result.response;
      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`AI Service Error: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

export const geminiService = GeminiService.getInstance();