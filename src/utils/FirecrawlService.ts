
import FirecrawlApp from '@mendable/firecrawl-js';

interface ScrapeResponse {
  success: boolean;
  completed?: number;
  total?: number;
  status?: string;
  data?: any[];
  error?: string;
  markdown?: string;
  html?: string;
  metadata?: any;
}

export class FirecrawlService {
  private firecrawlApp: any;
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';

  constructor(apiKey: string) {
    this.firecrawlApp = new FirecrawlApp({ apiKey });
  }

  static saveApiKey(apiKey: string): void {
    if (apiKey) {
      localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
      console.log('API key saved successfully');
    }
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  async scrapeWebsite(url: string, formats: string[]): Promise<ScrapeResponse> {
    try {
      console.log('Starting scraping for URL:', url);
      console.log('Requested formats:', formats);
      
      // Make sure URL has protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      const scrapeResult = await this.firecrawlApp.scrapeUrl(url);

      console.log('Scrape result:', scrapeResult);
      
      return scrapeResult;
    } catch (error) {
      console.error('Error during scraping:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }
}
