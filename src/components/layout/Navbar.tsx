'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  language: 'bn' | 'en';
  onToggleLanguage: () => void;
  t: {
    home: string;
    about: string;
    portfolio: string;
    services: string;
    contact: string;
    brandName: string;
  };
}

const navItems = [
  { key: 'home', id: 'home' },
  { key: 'about', id: 'about' },
  { key: 'portfolio', id: 'projects' },
  { key: 'services', id: 'services' },
  // Blog Navbar থেকে সরানো হয়েছে — Blog section এখনও তৈরি নেই
] as const;

export default function Navbar({ language, onToggleLanguage, t }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const labels: Record<string, string> = {
    home: t.home,
    about: t.about,
    portfolio: t.portfolio,
    services: t.services,
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-800'
          : 'bg-transparent py-6'
      }`}
      aria-label="Primary navigation"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
          aria-label="Go to top"
        >
          <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-cyan-500">
            <Image
              src="/joysriram-logo.png"
              alt="Joysriram Logo"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold bg-[linear-gradient(to_right,theme(colors.cyan.400),theme(colors.blue.600))] bg-clip-text text-transparent">
            {t.brandName}
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollToSection(id)}
              className="hover:text-cyan-400 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
            >
              {labels[key]}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {t.contact}
          </Button>
          <Button
            onClick={onToggleLanguage}
            variant="outline"
            size="sm"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all ml-2"
            aria-label={`Switch to ${language === 'bn' ? 'English' : 'Bengali'}`}
          >
            <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
            {language === 'bn' ? 'EN' : 'BN'}
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <Button
            onClick={onToggleLanguage}
            variant="outline"
            size="sm"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
            aria-label={`Switch to ${language === 'bn' ? 'English' : 'Bengali'}`}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="sm"
            className="text-white hover:text-cyan-400"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 absolute w-full left-0 top-full"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map(({ key, id }) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(id)}
                  className="text-left hover:text-cyan-400 transition-colors py-2"
                >
                  {labels[key]}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left hover:text-cyan-400 transition-colors py-2"
              >
                {t.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
