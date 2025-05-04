import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Loader, Download, Code, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ScrapeResult {
  success: boolean;
  completed?: number;
  total?: number;
  data?: any[];
  error?: string;
  markdown?: string;
  html?: string;
}

const ScraperForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('fc-16a3e7f140514247ba37f4c280fe8f58');
  const [isLoading, setIsLoading] = useState(false);
  const [formats, setFormats] = useState<string[]>(['markdown']);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScrapeResult | null>(null);
  const [activeTab, setActiveTab] = useState('markdown');
  const [viewMode, setViewMode] = useState<'raw' | 'preview'>('preview');

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
      
      console.log("Raw scrape result returned:", JSON.stringify(result, null, 2));
      
      if (result.success) {
        toast({
          title: "Success",
          description: `Successfully scraped content`,
        });
        
        console.log("Full result data:", result);
        
        // Handle the direct markdown/html content
        if (!result.data && (result.markdown || result.html)) {
          // Convert the response format to match our UI expectations
          setResults({
            ...result,
            data: [{
              markdown: result.markdown,
              html: result.html
            }]
          });
          
          // Set active tab to available format
          if (result.markdown) {
            setActiveTab('markdown');
          } else if (result.html) {
            setActiveTab('html');
          }
        } else if (result.data && result.data.length > 0) {
          // Handle original data array format
          setResults(result);
          
          // Check if any content exists in the first result
          const firstPage = result.data[0];
          if (!firstPage.markdown && !firstPage.html) {
            toast({
              title: "Warning",
              description: "No content was found on the page",
              variant: "destructive",
            });
            return;
          }
          
          // Set active tab to first available format in results
          if (firstPage.markdown) {
            setActiveTab('markdown');
          } else if (firstPage.html) {
            setActiveTab('html');
          }
        } else {
          toast({
            title: "Warning",
            description: "No data was returned from the scrape",
            variant: "destructive",
          });
          return;
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
              <div className="flex items-center gap-2">
                <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden flex">
                  <Button 
                    variant={viewMode === 'raw' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('raw')}
                    className="rounded-none"
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Raw
                  </Button>
                  <Button 
                    variant={viewMode === 'preview' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('preview')}
                    className="rounded-none"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Prepare download data
                    const downloadData = results.data ? results.data : [{
                      markdown: results.markdown,
                      html: results.html
                    }];
                    
                    const dataStr = JSON.stringify(downloadData, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `scraped-${new Date().toISOString()}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="markdown" 
                  disabled={!results.data[0]?.markdown}
                >
                  Markdown
                </TabsTrigger>
                <TabsTrigger 
                  value="html" 
                  disabled={!results.data[0]?.html}
                >
                  HTML
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="markdown" className="mt-4">
                <div className="max-h-96 overflow-auto rounded border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
                  {viewMode === 'raw' ? (
                    <pre className="whitespace-pre-wrap text-sm">
                      {results.data[0]?.markdown || "No markdown content available"}
                    </pre>
                  ) : (
                    <div className="markdown-preview prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      >
                        {results.data[0]?.markdown || "No markdown content available"}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="html" className="mt-4">
                <div className="max-h-96 overflow-auto rounded border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
                  {viewMode === 'raw' ? (
                    <pre className="whitespace-pre-wrap text-sm">
                      {results.data[0]?.html || "No HTML content available"}
                    </pre>
                  ) : (
                    <div 
                      className="html-preview" 
                      dangerouslySetInnerHTML={{ 
                        __html: results.data[0]?.html || "No HTML content available" 
                      }} 
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {results && results.error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Error</h3>
            <p className="text-red-600 dark:text-red-300 mt-2">{results.error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScraperForm;
