
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20" />
      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            Scrape Websites with <span className="text-gradient">Precision</span> & <span className="text-gradient">Power</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
            Extract valuable data from any website in seconds with our advanced scraping technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#scraper">
              <Button size="lg" className="rounded-full px-8 font-medium">
                Start Scraping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#features">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-medium">
                See Features
              </Button>
            </a>
          </div>
          
          {/* Browser mockup with code */}
          <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="bg-gray-100 dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-sm bg-white dark:bg-gray-800 px-4 py-1 rounded-md flex-1 text-center">
                ScrapeWave Demo
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 pb-20 overflow-hidden">
              <pre className="text-left overflow-x-auto text-sm">
                <code className="text-gray-900 dark:text-gray-300">
{`import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({apiKey: "fc-************"});

// Scrape a website:
const scrapeResult = await app.scrapeUrl('example.com', { 
  formats: ['markdown', 'html'] 
});

if (scrapeResult.success) {
  console.log("Pages scraped:", scrapeResult.completed);
  console.log("Content:", scrapeResult.data);
} else {
  console.error("Error:", scrapeResult.error);
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute top-1/4 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
      <div className="hidden md:block absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl" />
    </section>
  );
};

export default HeroSection;
