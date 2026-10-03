'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FlaskConical, Sparkles, BookOpen, Terminal, Cpu } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { labItems } from '@/data/content';

const STATUS_CONFIG: Record<string, { labelEn: string; labelBn: string; color: string }> = {
  building:     { labelEn: 'Building',     labelBn: 'নির্মাণাধীন', color: 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
  learning:     { labelEn: 'Learning',     labelBn: 'শিখছি',       color: 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800' },
  experimenting:{ labelEn: 'Experimenting',labelBn: 'পরীক্ষা',      color: 'text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800' },
  testing:      { labelEn: 'Testing',      labelBn: 'টেস্টিং',      color: 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
};

import { useLanguage } from '@/context/LanguageContext';

export default function LabPage() {
  const { language, isBn, toggleLanguage } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = labItems.filter(
    (item) => filter === 'all' || item.status === filter
  );

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${isBn ? 'font-hind-siliguri' : 'font-sans'}`}>
      <SiteHeader language={language} onToggleLanguage={toggleLanguage} />

      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-24 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          {isBn ? 'হোমে ফিরে যান' : 'Back to Home'}
        </Link>

        {/* Hero Banner */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-5 h-5 text-[var(--accent-tech)]" />
            <p className="section-label text-[var(--accent-tech)]">PERSONAL LABORATORY</p>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            {isBn ? 'ডিজিটাল ল্যাব — যা আমি এখন অন্বেষণ করছি' : "The Lab — Things I'm Figuring Out"}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {isBn
              ? 'এখানে কোনো পালিশ করা প্রজেক্টের ভণিতা নেই। এটি আমার চলমান শেখার ক্ষেত্র—কম্পাইলার তত্ত্ব, সিএসএস আর্কিটেকচার, পাইথন অটোমেশন এবং এআই-সহায়ক সফটওয়্যার ইঞ্জিনিয়ারিং।'
              : "This is not a showcase of polished products. This is my active research and learning workshop — compiler design, CSS layout sizing, database primitives, and AI-assisted engineering."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-[var(--border)]">
          {[
            { id: 'all',           labelEn: 'All Topics',     labelBn: 'সব বিষয়' },
            { id: 'building',      labelEn: 'Building',       labelBn: 'তৈরি করছি' },
            { id: 'learning',      labelEn: 'Learning',       labelBn: 'শিখছি' },
            { id: 'experimenting', labelEn: 'Experimenting',  labelBn: 'পরীক্ষা করছি' },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  active
                    ? 'bg-[var(--text)] text-[var(--bg)]'
                    : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)]'
                }`}
              >
                {isBn ? tab.labelBn : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Grid of Lab Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.learning;
            return (
              <motion.div
                key={item.nameEn}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 rounded border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${cfg.color}`}>
                      {isBn ? cfg.labelBn : cfg.labelEn}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-faint)]">
                      TOPIC #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[var(--text)] mb-2">
                    {isBn ? item.nameBn : item.nameEn}
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {isBn ? item.descBn : item.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-faint)]">
                  <span>{isBn ? 'সক্রিয় চর্চা' : 'Active Exploration'}</span>
                  <span className="font-mono text-[var(--accent-tech)]">● 2026</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methodology note */}
        <div className="mt-16 p-8 rounded border border-[var(--border)] bg-[var(--surface)]">
          <h3 className="text-lg font-bold text-[var(--text)] mb-3">
            {isBn ? 'লার্নিং ফিলোসফি: তৈরি করে শেখা' : 'Learning Philosophy: Building to Understand'}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
            {isBn
              ? 'আমি কোনো বিষয় কেবল তাত্ত্বিকভাবে পড়ি না; বরং একটি বাস্তব স্ক্রিপ্ট, ইউজার ইন্টারফেস বা ছোট লাইব্রেরি তৈরি করে তার ভেতরে প্রবেশ করি। যখন কোনো ভুল হয়, তখনই আসল শিক্ষা শুরু হয়।'
              : 'I don’t just read documentation passively. I build a small tool, prototype an interface, or break down a parser until the underlying primitives make sense.'}
          </p>
        </div>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
