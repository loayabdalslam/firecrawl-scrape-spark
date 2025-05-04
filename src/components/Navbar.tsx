import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Search } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Search className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">Ahym | Scrape me now</span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            <a href="#features" className="transition-colors hover:text-primary">
              Features
            </a>
            <a href="#scraper" className="transition-colors hover:text-primary">
              Try It
            </a>
            <a href="#pricing" className="transition-colors hover:text-primary">
              Pricing
            </a>
          </nav>
          <a href="#scraper">
            <Button>Get Started</Button>
          </a>
        </div>
        
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {isMenuOpen && <div className="md:hidden p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-3">
            <a href="#features" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              Features
            </a>
            <a href="#scraper" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              Try It
            </a>
            <a href="#pricing" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              Pricing
            </a>
            <Button className="mt-2">Get Started</Button>
          </nav>
        </div>}
    </header>;
};
export default Navbar;