'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';

interface SiteHeaderProps {
  language?: 'bn' | 'en';
  onToggleLanguage?: () => void;
}

const navLinks = [
  { href: '/#work',       labelEn: 'Work',        labelBn: 'কাজ' },
  { href: '/projects',    labelEn: 'Projects',     labelBn: 'প্রজেক্ট' },
  { href: '/lab',         labelEn: 'Lab',          labelBn: 'ল্যাব' },
  { href: '/open-source', labelEn: 'Open Source',  labelBn: 'ওপেন সোর্স' },
  { href: '/about',       labelEn: 'About',        labelBn: 'আমার সম্পর্কে' },
  { href: '/writing',     labelEn: 'Writing',      labelBn: 'লেখা' },
] as const;

export default function SiteHeader({ language: propLang, onToggleLanguage: propToggle }: SiteHeaderProps = {}) {
  const { language: ctxLang, toggleLanguage: ctxToggle } = useLanguage();
  const language = propLang ?? ctxLang;
  const onToggleLanguage = propToggle ?? ctxToggle;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isBn = language === 'bn';
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      aria-label="Site header"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="font-semibold text-[var(--text)] hover:text-[var(--accent-bengali)] transition-colors text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)] rounded"
          aria-label="Home"
        >
          {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {navLinks.map(({ href, labelEn, labelBn }) => {
            const cleanHref = href.startsWith('/#') ? '/' : href;
            const isActive = pathname === href || (cleanHref !== '/' && Boolean(pathname?.startsWith(cleanHref)));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive
                    ? 'text-[var(--accent-bengali)] font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)]`}
              >
                {isBn ? labelBn : labelEn}
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={onToggleLanguage}
            aria-label={isBn ? 'Switch to English' : 'বাংলায় পড়ুন'}
            className="section-label px-2 py-1 rounded border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-bengali)] hover:text-[var(--accent-bengali)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)]"
          >
            {isBn ? 'EN' : 'BN'}
          </button>

          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-1.5 rounded border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-bengali)] hover:text-[var(--accent-bengali)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)]"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)]"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
          >
            <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(({ href, labelEn, labelBn }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors border-b border-[var(--border)] last:border-0"
                >
                  {isBn ? labelBn : labelEn}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
