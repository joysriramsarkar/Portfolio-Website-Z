'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  language: 'bn' | 'en';
}

const nowBuilding = ['BanglaGan', 'Bangla Typing', 'POS', 'Chalao'];
const nowLearning = ['CSS / Responsive Design', 'Python', 'AI Mathematics'];
const nowExploring = ['Nilang', 'Alap', 'Onuron Ecosystem'];

export default function Hero({ language }: HeroProps) {
  const isBn = language === 'bn';

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20 pb-12 max-w-6xl mx-auto px-5 sm:px-8"
      aria-label="Introduction"
    >
      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="section-label mb-8 text-[var(--accent-bengali)]"
      >
        {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
      </motion.p>

      {/* Main headline — 2 column on large screens */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] leading-[1.1] tracking-tight mb-6"
          >
            {isBn ? (
              <>
                AI দিয়ে ডিজিটাল টুল{' '}
                <span className="text-[var(--accent-bengali)]">তৈরি করি</span>
              </>
            ) : (
              <>
                I build digital tools{' '}
                <span className="text-[var(--accent-bengali)]">with AI,</span>
                <br />code and ideas
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose-editorial max-w-xl mb-10"
          >
            {isBn
              ? 'বাংলা ভাষা, software, open source ও প্রযুক্তি নিয়ে আমি বিভিন্ন ধরনের digital products তৈরি করছি — AI-সহায়ক development workflow ব্যবহার করে, ক্রমাগত engineering fundamentals গভীর করতে করতে।'
              : 'I work at the intersection of Bengali language, software, and open source — building digital products using AI-assisted workflows while continuously deepening engineering fundamentals.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="#work"
              className="inline-flex items-center gap-2 bg-[var(--accent-bengali)] hover:bg-[var(--accent-bengali-light)] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)]"
            >
              {isBn ? 'কাজ দেখুন' : 'Explore my work'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="https://github.com/joysriramsarkar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] text-sm font-medium px-5 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bengali)]"
            >
              GitHub
            </a>
          </motion.div>
        </div>

        {/* NOW strip — currently building/learning/exploring */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="hidden lg:block min-w-[200px]"
        >
          <p className="section-label text-[var(--text-faint)] mb-4">
            {isBn ? 'এখন' : 'NOW'}
          </p>

          <div className="space-y-5">
            <div>
              <p className="section-label text-[var(--accent-bengali)] mb-2">
                {isBn ? 'তৈরি করছি' : 'BUILDING'}
              </p>
              <ul className="space-y-1">
                {nowBuilding.map((item) => (
                  <li key={item} className="text-xs text-[var(--text-muted)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-label text-[var(--accent-tech)] mb-2">
                {isBn ? 'শিখছি' : 'LEARNING'}
              </p>
              <ul className="space-y-1">
                {nowLearning.map((item) => (
                  <li key={item} className="text-xs text-[var(--text-muted)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-label text-[var(--text-faint)] mb-2">
                {isBn ? 'পরীক্ষা করছি' : 'EXPLORING'}
              </p>
              <ul className="space-y-1">
                {nowExploring.map((item) => (
                  <li key={item} className="text-xs text-[var(--text-muted)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Identity tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="mt-16 pt-8 border-t border-[var(--border)] flex flex-wrap gap-x-6 gap-y-1"
      >
        {[
          isBn ? 'AI-সহায়ক builder' : 'AI-assisted builder',
          isBn ? 'বাংলা-প্রথম প্রযুক্তি' : 'Bengali-first technologist',
          isBn ? 'ওপেন-সোর্স experimenter' : 'Open-source experimenter',
          isBn ? 'স্বাধীন software maker' : 'Independent software maker',
        ].map((tag, i) => (
          <span key={i} className="section-label text-[var(--text-faint)]">
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
