
import { useState } from 'react';
import { ArrowRight, CheckCircle, Globe, Search } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import ScraperForm from "@/components/ScraperForm";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <section className="py-20 px-4 bg-gray-50" id="scraper">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Try Our Scraper</h2>
            <div className="max-w-3xl mx-auto">
              <ScraperForm />
            </div>
          </div>
        </section>
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
