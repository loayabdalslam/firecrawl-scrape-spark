
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Loader } from 'lucide-react';

interface ScrapeResult {
  success: boolean;
  completed?: number;
  total?: number;
  data?: any[];
}

const ScraperForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('fc-16a3e7f140514247ba37f4c280fe8f58');
  const [isLoading, setIsLoading] = useState(false);
  const [formats, setFormats] = useState<string[]>(['markdown']);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('markdown');

  const toggleFormat = (format: string) => {
    if (formats.includes(format)) {
      setFormats(formats.filter(f => f !== format));
    } else {
      setFormats([...formats, format]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (formats.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one format",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(10);
    setResults(null);

    try {
      // Initialize service with API key
      const firecrawlService = new FirecrawlService(apiKey);
      
      setProgress(30);
      
      // Start scraping
      const result = await firecrawlService.scrapeWebsite(url, formats);
      
      setProgress(100);
      
      if (result.success) {
        toast({
          title: "Success",
          description: `Successfully scraped ${result.completed} pages`,
        });
        setResults(result);
        
        // Set active tab to first available format in results
        if (result.data && result.data.length > 0) {
          const firstPage = result.data[0];
          if (firstPage.markdown) {
            setActiveTab('markdown');
          } else if (firstPage.html) {
            setActiveTab('html');
          }
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to scrape website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error scraping website:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Web Scraper</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Website URL
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Data Format</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="markdown"
                  checked={formats.includes('markdown')}
                  onCheckedChange={() => toggleFormat('markdown')}
                />
                <label htmlFor="markdown" className="text-sm cursor-pointer">Markdown</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="html"
                  checked={formats.includes('html')}
                  onCheckedChange={() => toggleFormat('html')}
                />
                <label htmlFor="html" className="text-sm cursor-pointer">HTML</label>
              </div>
            </div>
          </div>
          
          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Scraping in progress...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              'Scrape Website'
            )}
          </Button>
        </form>
        
        {results && results.data && results.data.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Results</h3>
              <span className="text-sm text-gray-500">
                {results.completed} pages scraped
              </span>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="markdown" disabled={!results.data[0].markdown}>
                  Markdown
                </TabsTrigger>
                <TabsTrigger value="html" disabled={!results.data[0].html}>
                  HTML
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="markdown" className="mt-4">
                <div className="max-h-96 overflow-auto rounded border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
                  <pre className="whitespace-pre-wrap text-sm">
                    {results.data[0].markdown || "No markdown content available"}
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="html" className="mt-4">
                <div className="max-h-96 overflow-auto rounded border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
                  <pre className="whitespace-pre-wrap text-sm">
                    {results.data[0].html || "No HTML content available"}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScraperForm;
