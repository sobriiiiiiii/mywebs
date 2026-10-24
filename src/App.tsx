/**
 * @license
 * Johnston Roofing - Proposed Digital Identity & High-Converting Web Platform
 * Styled after premier American Roofing Contractor reference design.
 */

import React, { useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { ServicesShowcase } from './components/ServicesShowcase';
import { MaterialSpecExplorer } from './components/MaterialSpecExplorer';
import { ProjectGallery } from './components/ProjectGallery';
import { ExecutionProcess } from './components/ExecutionProcess';
import { QuoteCalculator } from './components/QuoteCalculator';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ProductionChecklistDrawer } from './components/ProductionChecklistDrawer';

export default function App() {
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [selectedSystemForEstimate, setSelectedSystemForEstimate] = useState<string>('standing-seam');
  const [leadData, setLeadData] = useState<{ name: string; phone: string; address: string; service: string } | null>(null);

  const scrollToQuote = (systemKey?: string) => {
    if (systemKey) {
      setSelectedSystemForEstimate(systemKey);
    }
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInstantQuoteSubmit = (data: { name: string; phone: string; address: string; service: string }) => {
    setLeadData(data);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-body selection:bg-[#FA5A00]/25 selection:text-black flex flex-col antialiased">
      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Top Banner & Header (Navbar with House logo and Orange CTA) */}
      <Header
        onOpenChecklist={() => setChecklistOpen(true)}
        onNavigateToQuote={() => scrollToQuote()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero (Roofer background, Left Copy + Stars, Right Floating White Quote Card, Bottom 3-Col Stats Bar) */}
        <Hero
          onConfigureScope={() => scrollToQuote()}
          onExploreServices={scrollToServices}
          onInstantQuoteSubmit={handleInstantQuoteSubmit}
        />

        {/* Section 2: Core Roofing Services Portfolio */}
        <ServicesShowcase
          onSelectServiceForEstimate={(serviceId) => scrollToQuote(serviceId)}
        />

        {/* Section 3: Substrate 5-Layer Protection System */}
        <BrandPhilosophy />

        {/* Section 4: Materials & Specifications Comparison Matrix */}
        <MaterialSpecExplorer
          onSelectSystem={(systemKey) => scrollToQuote(systemKey)}
        />

        {/* Section 5: Real Project & Installation Photo Showcase */}
        <ProjectGallery />

        {/* Section 6: 5-Step Process */}
        <ExecutionProcess />

        {/* Section 7: Live Roof Scope Calculator & Estimate Booking */}
        <QuoteCalculator
          initialSystemKey={selectedSystemForEstimate}
          initialLeadData={leadData}
        />

        {/* Section 8: Frequently Addressed Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenChecklist={() => setChecklistOpen(true)}
        onNavigateToQuote={() => scrollToQuote()}
      />

      {/* Client Onboarding / Production Checklist Drawer */}
      <ProductionChecklistDrawer
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />
    </div>
  );
}
