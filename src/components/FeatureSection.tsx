
import { Globe, Search, CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Globe,
    title: "Scrape Any Website",
    description: "Extract data from any public website with our powerful scraping engine."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "All operations follow best practices for ethical web scraping."
  },
  {
    icon: Search,
    title: "Advanced Filtering",
    description: "Easily filter and extract only the data you need from pages."
  },
  {
    icon: CheckCircle,
    title: "Structured Output",
    description: "Get clean, structured data in markdown or HTML format."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 px-4" id="features">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our web scraping tool provides everything you need to extract valuable data.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
              <ul className="space-y-3">
                {[
                  "Enter the URL of the website you want to scrape",
                  "Select which data formats you need (Markdown, HTML)",
                  "Our system extracts all relevant data from the website",
                  "View and download your structured data instantly"
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm mr-2 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                {[
                  "Lightning-fast scraping with minimal setup",
                  "Clean, structured data ready for your applications",
                  "Reasonable pricing with generous free tier",
                  "Enterprise-grade reliability and support"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
