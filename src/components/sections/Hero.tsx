'use client';

import Image from 'next/image';
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
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 max-w-6xl mx-auto px-5 sm:px-8"
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

      {/* Main headline + Editorial Portrait — 2 column on large screens */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text)] leading-[1.15] tracking-tight mb-6"
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
            className="prose-editorial max-w-xl mb-8"
          >
            {isBn
              ? 'বাংলা ভাষা, software, open source ও প্রযুক্তি নিয়ে আমি বিভিন্ন ধরনের digital products তৈরি করছি — AI-সহায়ক development workflow ব্যবহার করে, ক্রমাগত engineering fundamentals গভীর করতে করতে।'
              : 'I work at the intersection of Bengali language, software, and open source — building digital products using AI-assisted workflows while continuously deepening engineering fundamentals.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
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

          {/* Active building indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mt-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isBn
                ? 'বর্তমানে সক্রিয় কাজ: বাংলা ইকোসিস্টেম ও ডেভেলপার টুলস'
                : 'Active focus: Bengali computing & developer tools'}
            </span>
          </motion.div>

          {/* Mobile Portrait — Section 51 of plan */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:hidden mt-8 flex justify-center"
          >
            <div className="w-full max-w-[260px] bg-[var(--surface)] p-2 rounded border border-[var(--border)] shadow-sm">
              <div className="relative aspect-[4/5] w-full rounded overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src="/profile.webp"
                  alt={isBn ? "জয়শ্রীরাম সরকার — প্রতিকৃতি" : "Joysriram Sarkar — Portrait"}
                  fill
                  priority
                  quality={95}
                  sizes="260px"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-2.5 px-1 text-center">
                <p className="text-xs font-semibold text-[var(--text)]">
                  {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
                </p>
                <p className="text-[10px] font-mono text-[var(--text-faint)] mt-0.5">
                  {isBn ? 'নির্মাতা · শিক্ষার্থী · ওপেন সোর্স' : 'Builder · Learner · Open Source'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Vertical Editorial Portrait — Section 31 of plan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex flex-col items-end justify-center"
        >
          <div className="w-full max-w-[300px] bg-[var(--surface)] p-2.5 rounded border border-[var(--border)] shadow-sm">
            <div className="relative aspect-[4/5] w-full rounded overflow-hidden bg-[var(--surface-2)]">
              <Image
                src="/profile.webp"
                alt={isBn ? "জয়শ্রীরাম সরকার — প্রতিকৃতি" : "Joysriram Sarkar — Portrait"}
                fill
                priority
                quality={95}
                sizes="300px"
                className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="mt-3 px-1">
              <p className="text-xs font-semibold text-[var(--text)]">
                {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
              </p>
              <p className="text-[11px] font-mono text-[var(--text-faint)] mt-0.5">
                {isBn ? 'নির্মাতা · শিক্ষার্থী · ওপেন সোর্স' : 'Builder · Learner · Open Source'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* NOW status strip — Section 6 of plan */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-14 p-5 sm:p-6 rounded border border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="section-label text-[var(--accent-bengali)]">
              {isBn ? 'এখন / বর্তমান ব্যস্ততা' : 'NOW / CURRENT FOCUS'}
            </span>
          </div>
          <Link
            href="/now"
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] inline-flex items-center gap-1 transition-colors"
          >
            {isBn ? 'সম্পূর্ণ /now পেজ দেখুন →' : 'View full /now page →'}
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="section-label text-[var(--accent-bengali)] mb-2">
              {isBn ? 'তৈরি করছি' : 'BUILDING'}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {nowBuilding.join(' · ')}
            </p>
          </div>
          <div>
            <p className="section-label text-[var(--accent-tech)] mb-2">
              {isBn ? 'শিখছি' : 'LEARNING'}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {nowLearning.join(' · ')}
            </p>
          </div>
          <div>
            <p className="section-label text-[var(--text-faint)] mb-2">
              {isBn ? 'পরীক্ষা করছি' : 'EXPLORING'}
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {nowExploring.join(' · ')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Identity tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="mt-16 pt-8 border-t border-[var(--border)] flex flex-wrap gap-x-6 gap-y-1"
      >
        {[
          isBn ? 'AI-সহায়ক নির্মাতা' : 'AI-assisted builder',
          isBn ? 'বাংলা-প্রথম প্রযুক্তি' : 'Bengali-first technologist',
          isBn ? 'ওপেন-সোর্স গবেষক' : 'Open-source experimenter',
          isBn ? 'স্বাধীন সফটওয়্যার নির্মাতা' : 'Independent software maker',
        ].map((tag, i) => (
          <span key={i} className="section-label text-[var(--text-faint)]">
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
