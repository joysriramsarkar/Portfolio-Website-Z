'use client';

import { useState } from 'react';

// Layout
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';

// Sections
import Hero from '@/components/sections/Hero';
import SelectedWork from '@/components/sections/FeaturedProjects';
import HowIBuild from '@/components/sections/HowIBuild';
import LabTeaser from '@/components/sections/LabTeaser';
import OpenSourceStrip from '@/components/sections/OpenSourceStrip';
import BuildLogStrip from '@/components/sections/BuildLogStrip';
import AboutTeaser from '@/components/sections/AboutTeaser';
import WritingTeaser from '@/components/sections/WritingTeaser';
import Contact from '@/components/sections/Contact';

export default function PortfolioClient() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  return (
    <div
      className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${
        language === 'bn' ? 'font-hind-siliguri' : 'font-sans'
      }`}
    >
      {/* 1. Header / Navbar */}
      <SiteHeader language={language} onToggleLanguage={toggleLanguage} />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero language={language} />

        {/* 3. Selected Work (01 / SELECTED WORK) */}
        <SelectedWork language={language} />

        {/* 4. How I Build (02 / HOW I BUILD) */}
        <HowIBuild language={language} />

        {/* 5. The Lab (03 / THE LAB) */}
        <LabTeaser language={language} />

        {/* 6. Open Source (04 / OPEN SOURCE) */}
        <OpenSourceStrip language={language} />

        {/* 7. Build Log (TECHNICAL JOURNAL) */}
        <BuildLogStrip language={language} />

        {/* 8. About Teaser (05 / ABOUT) */}
        <AboutTeaser language={language} />

        {/* 9. Writing Teaser (06 / WRITING) */}
        <WritingTeaser language={language} />

        {/* 10. Contact (07 / CONTACT) */}
        <Contact language={language} />
      </main>

      {/* 11. Footer */}
      <SiteFooter language={language} />
    </div>
  );
}
