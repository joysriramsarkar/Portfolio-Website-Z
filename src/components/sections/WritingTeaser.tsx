'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookMarked } from 'lucide-react';
import { articles } from '@/data/writing';

interface WritingTeaserProps {
  language: 'bn' | 'en';
}

export default function WritingTeaser({ language }: WritingTeaserProps) {
  const isBn = language === 'bn';

  return (
    <section id="writing" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookMarked className="w-4 h-4 text-[var(--accent-bengali)]" aria-hidden="true" />
              <p className="section-label text-[var(--accent-bengali)]">06 / WRITING</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              {isBn ? 'প্রযুক্তি ও চিন্তার নোট' : 'Technical Notes & Writing'}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {isBn
                ? 'সফটওয়্যার তৈরি, ইউনিকোড ও AI-সহায়ক কাজের বাস্তব অভিজ্ঞতা নিয়ে লেখা।'
                : 'Reflections on software architecture, Unicode challenges, and building in the open.'}
            </p>
          </div>

          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-bengali)] hover:underline whitespace-nowrap font-medium group"
          >
            {isBn ? 'সব লেখা পড়ুন' : 'Read all essays'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Article list */}
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {articles.slice(0, 3).map((article, idx) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="py-6 group flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[var(--surface)] px-3 -mx-3 rounded transition-colors"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="section-label text-[var(--accent-tech)]">
                    {isBn ? article.categoryBn : article.category}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-faint)]">
                    {article.date}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-faint)]">
                    • {isBn ? article.readTimeBn : article.readTimeEn}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent-bengali)] transition-colors">
                  <Link href={`/writing#${article.slug}`}>
                    {isBn ? article.titleBn : article.titleEn}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                  {isBn ? article.excerptBn : article.excerptEn}
                </p>
              </div>

              <Link
                href={`/writing#${article.slug}`}
                className="text-xs font-medium text-[var(--accent-bengali)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform self-start sm:self-auto shrink-0"
              >
                {isBn ? 'পড়ুন' : 'Read'}
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
