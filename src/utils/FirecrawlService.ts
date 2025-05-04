
import FirecrawlApp from '@mendable/firecrawl-js';

interface ScrapeResponse {
  success: boolean;
  completed?: number;
  total?: number;
  status?: string;
  data?: any[];
  error?: string;
}

export class FirecrawlService {
  private firecrawlApp: any;

  constructor(apiKey: string) {
    this.firecrawlApp = new FirecrawlApp({ apiKey });
  }

  async scrapeWebsite(url: string, formats: string[]): Promise<ScrapeResponse> {
    try {
      console.log('Starting scraping for URL:', url);
      console.log('Requested formats:', formats);
      
      // Make sure URL has protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      const scrapeResult = await this.firecrawlApp.scrapeUrl(url, {
        formats: formats as ('markdown' | 'html')[]
      });

      console.log('Scrape result:', scrapeResult);
      
      if (!scrapeResult.success) {
        return {
          success: false,
          error: scrapeResult.error || 'Failed to scrape website'
        };
      }

      return {
        success: true,
        completed: scrapeResult.completed,
        total: scrapeResult.total,
        status: scrapeResult.status,
        data: scrapeResult.data
      };
    } catch (error) {
      console.error('Error during scraping:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }
}
