'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import DesignShowcase from '../DesignShowcase';
import { translations } from '../translations';

export default function DesignsPage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 ${language === 'bn' ? 'font-hind-siliguri' : 'font-sans'}`}>
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="text-cyan-500 hover:text-cyan-400">
              <ArrowLeft className="mr-2 w-4 h-4" /> {t.backToHome}
            </Button>
          </Link>

          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'EN' : 'BN'}
          </Button>
        </div>
      </nav>

      <div className="pt-20">
        <DesignShowcase language={language} />
      </div>

      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-slate-500 text-sm">{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
