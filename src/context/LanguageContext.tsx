'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'bn' | 'en';

export interface LanguageContextType {
  language: Language;
  isBn: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'bn',
  isBn: true,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('bn');

  useEffect(() => {
    try {
      // 1. Priority: URL query param (?lang=en or ?lang=bn)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'en' || urlLang === 'bn') {
        setLanguageState(urlLang);
        localStorage.setItem('preferred_lang', urlLang);
        document.documentElement.lang = urlLang;
        return;
      }

      // 2. Secondary: Saved preference in localStorage
      const stored = localStorage.getItem('preferred_lang');
      if (stored === 'en' || stored === 'bn') {
        setLanguageState(stored);
        document.documentElement.lang = stored;
        return;
      }
    } catch {
      // LocalStorage might be disabled in private browsing or strict iframes
    }

    // Default to Bengali
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'bn';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('preferred_lang', lang);
    } catch {
      // LocalStorage might fail
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isBn: language === 'bn',
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
