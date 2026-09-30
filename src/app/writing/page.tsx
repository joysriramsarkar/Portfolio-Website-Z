'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookMarked, Calendar, Clock, Tag } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { articles, type Article } from '@/data/writing';

export default function WritingPage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const isBn = language === 'bn';

  const selectedArticle = activeSlug ? articles.find((a) => a.slug === activeSlug) : null;

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${isBn ? 'font-hind-siliguri' : 'font-sans'}`}>
      <SiteHeader language={language} onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 pt-24 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          {isBn ? 'হোমে ফিরে যান' : 'Back to Home'}
        </Link>

        {selectedArticle ? (
          /* Single Article Reader */
          <div>
            <button
              onClick={() => setActiveSlug(null)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-bengali)] hover:underline mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isBn ? 'সব লেখার তালিকায় ফিরুন' : 'Back to all articles'}
            </button>

            <header className="mb-8 pb-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-faint)] mb-3">
                <span className="section-label text-[var(--accent-tech)]">
                  {isBn ? selectedArticle.categoryBn : selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{isBn ? selectedArticle.readTimeBn : selectedArticle.readTimeEn}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] leading-tight mb-4">
                {isBn ? selectedArticle.titleBn : selectedArticle.titleEn}
              </h1>

              <p className="text-base text-[var(--text-muted)] italic leading-relaxed">
                {isBn ? selectedArticle.excerptBn : selectedArticle.excerptEn}
              </p>
            </header>

            <article className="space-y-6 text-base sm:text-lg text-[var(--text)] leading-relaxed prose-editorial">
              {(isBn ? selectedArticle.contentBn : selectedArticle.contentEn).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </article>

            <div className="mt-12 pt-6 border-t border-[var(--border)] flex justify-between items-center">
              <button
                onClick={() => setActiveSlug(null)}
                className="text-xs font-medium text-[var(--accent-bengali)] hover:underline"
              >
                {isBn ? '← সব লেখা' : '← All Articles'}
              </button>
              <span className="text-xs font-mono text-[var(--text-faint)]">
                Joysriram Engineering Lab
              </span>
            </div>
          </div>
        ) : (
          /* Articles List */
          <div>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <BookMarked className="w-5 h-5 text-[var(--accent-bengali)]" />
                <p className="section-label text-[var(--accent-bengali)]">ESSAYS & TECHNICAL NOTES</p>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
                {isBn ? 'প্রযুক্তি ও চিন্তার নোট' : 'Writing & Technical Notes'}
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
                {isBn
                  ? 'সফটওয়্যার আর্কিটেকচার, বাংলা কম্পিউটিংয়ের চ্যালেঞ্জ, AI-সহায়ক কোডিং এবং নতুন প্রজেক্ট তৈরির ব্যক্তিগত পর্যবেক্ষণ।'
                  : 'Reflections on software architecture, Bengali Unicode challenges, AI-assisted execution, and lessons from shipping real projects.'}
              </p>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {articles.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  id={article.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="py-8 group"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-faint)] mb-2">
                    <span className="section-label text-[var(--accent-tech)]">
                      {isBn ? article.categoryBn : article.category}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{isBn ? article.readTimeBn : article.readTimeEn}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent-bengali)] transition-colors mb-3">
                    <button
                      onClick={() => setActiveSlug(article.slug)}
                      className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)] rounded"
                    >
                      {isBn ? article.titleBn : article.titleEn}
                    </button>
                  </h2>

                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-4">
                    {isBn ? article.excerptBn : article.excerptEn}
                  </p>

                  <button
                    onClick={() => setActiveSlug(article.slug)}
                    className="text-xs font-medium text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
                  >
                    {isBn ? 'সম্পূর্ণ পড়ুন' : 'Read essay'}
                    <span aria-hidden="true">→</span>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
