'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { translations } from './translations';

// Layout components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Section components
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Contact from '@/components/sections/Contact';

// Feature components (already componentized)
import GithubProjects from './GithubProjects';
import DesignShowcase from './DesignShowcase';
import WikimediaContributions from './WikimediaContributions';

export default function PortfolioClient() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const t = translations[language];

  const toggleLanguage = () => setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden ${
        language === 'bn' ? 'font-hind-siliguri' : 'font-sans'
      }`}
    >
      {/* Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        t={{
          home: t.home,
          about: t.about,
          portfolio: t.portfolio,
          services: t.services,
          contact: t.contact,
          brandName: t.brandName,
        }}
      />

      {/* 1. Hero */}
      <Hero
        language={language}
        t={{
          headline: t.headline,
          subheadline: t.subheadline,
          hireMe: t.hireMe,
          viewProjects: t.viewProjects,
        }}
        onScrollTo={scrollToSection}
      />

      {/* 2. Stats */}
      <Stats
        t={{
          experience: t.experience,
          experienceLabel: t.experienceLabel,
          projects: t.projects,
          projectsLabel: t.projectsLabel,
          dedication: t.dedication,
          dedicationLabel: t.dedicationLabel,
          support: t.support,
          supportLabel: t.supportLabel,
        }}
      />

      {/* 3. About */}
      <About
        t={{
          aboutTitle: t.aboutTitle,
          aboutSubtitle: t.aboutSubtitle,
          aboutText1: t.aboutText1,
          aboutText2: t.aboutText2,
          aboutText3: t.aboutText3,
        }}
      />

      {/* 4. Selected Work */}
      <FeaturedProjects
        language={language}
        t={{
          portfolio: t.portfolio,
          projectsTitle: t.projectsTitle,
          project1Title: t.project1Title,
          project1Desc: t.project1Desc,
          project1Tech: t.project1Tech,
          project1Link: t.project1Link,
          project2Title: t.project2Title,
          project2Desc: t.project2Desc,
          project2Tech: t.project2Tech,
          project2Link: t.project2Link,
          project3Title: t.project3Title,
          project3Desc: t.project3Desc,
          project3Tech: t.project3Tech,
          project3Link: t.project3Link,
        }}
      />

      {/* 5. Services */}
      <Services
        t={{
          servicesTitle: t.servicesTitle,
          service1Title: t.service1Title,
          service1Desc: t.service1Desc,
          service2Title: t.service2Title,
          service2Desc: t.service2Desc,
          service3Title: t.service3Title,
          service3Desc: t.service3Desc,
        }}
      />

      {/* 6. GitHub Projects */}
      <GithubProjects language={language} translations={translations} />

      {/* 7. Design Showcase */}
      <DesignShowcase language={language} limit={6} />

      {/* 8. Wikimedia Contributions */}
      <WikimediaContributions language={language} translations={translations} />

      {/* 9. CTA */}
      <section className="py-20 bg-[linear-gradient(to_right,theme(colors.cyan.700),theme(colors.blue.700))]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {t.ctaText}
          </h2>
          <Button
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="bg-white text-cyan-700 hover:bg-slate-100 font-bold px-8 py-6 text-lg rounded-full shadow-xl transition-colors"
          >
            {t.getInTouch}
          </Button>
        </div>
      </section>

      {/* 10. Contact */}
      <Contact
        language={language}
        t={{
          contact: t.contact,
          address: t.address,
          namePlaceholder: t.namePlaceholder,
          emailPlaceholder: t.emailPlaceholder,
          messagePlaceholder: t.messagePlaceholder,
          sendMessage: t.sendMessage,
        }}
      />

      {/* Footer */}
      <Footer copyright={t.copyright} />

      {/* Mobile Floating CTA */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => scrollToSection('contact')}
          className="rounded-full w-14 h-14 bg-cyan-600 shadow-lg shadow-cyan-500/40 flex items-center justify-center"
          aria-label={language === 'bn' ? 'যোগাযোগ করুন' : 'Contact me'}
        >
          <Mail className="w-6 h-6 text-white" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
