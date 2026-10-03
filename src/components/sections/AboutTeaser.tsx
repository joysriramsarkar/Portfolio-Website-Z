'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { timeline } from '@/data/content';

interface AboutTeaserProps {
  language: 'bn' | 'en';
}

export default function AboutTeaser({ language }: AboutTeaserProps) {
  const isBn = language === 'bn';

  return (
    <section id="about" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          {/* Left Column: Narrative */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--border)] shrink-0">
                <Image
                  src="/profile.webp"
                  alt={isBn ? "জয়শ্রীরাম সরকার" : "Joysriram Sarkar"}
                  fill
                  quality={95}
                  sizes="44px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text)] leading-tight">
                  {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
                </p>
                <p className="text-[11px] font-mono text-[var(--text-faint)]">
                  {isBn ? 'শিলিগুড়ি, ভারত · ২০১৯ থেকে সক্রিয়' : 'Siliguri, India · Active since 2019'}
                </p>
              </div>
            </div>
            <p className="section-label text-[var(--accent-bengali)] mb-2">05 / ABOUT</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">
              {isBn
                ? 'আমি প্রথাগত ধারায় আসিনি, এসেছি তৈরি করার তাগিদে'
                : 'I came into technology not through credentials, but by building'}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed prose-editorial">
              <p>
                {isBn
                  ? '২০১৯ সালে বাংলা সাহিত্য ও লেখার মধ্য দিয়ে আমার যাত্রা শুরু। প্রযুক্তিকে আমি দেখেছি মানুষের ভাব প্রকাশের ও সমস্যা সমাধানের সবচেয়ে জীবন্ত মাধ্যম হিসেবে।'
                  : 'My journey began in 2019 through Bengali literature and writing. I saw technology as the most dynamic medium for human expression and solving everyday challenges.'}
              </p>
              <p>
                {isBn
                  ? 'প্রথাগত কম্পিউটার সায়েন্সের ডিগ্রি নয়, বরং প্রতিদিনের প্রয়োজন থেকে কোড করা, লিনাক্স শেখা এবং পরবর্তীতে AI-সহায়ক আধুনিক সফটওয়্যার আর্কিটেকচার চর্চাই আমাকে নির্মাতা হিসেবে গড়ে তুলেছে।'
                  : 'Rather than a conventional computer science degree, it was daily curiosity—learning Linux, writing scripts, and later mastering modern AI-assisted engineering—that shaped me into a builder.'}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[var(--text)] hover:bg-[var(--accent-bengali)] text-[var(--bg)] hover:text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
              >
                {isBn ? 'আমার পূর্ণ গল্প পড়ুন' : 'Read my full story'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/now"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                {isBn ? 'এখন কী করছি (/now)' : 'What I do now (/now)'}
              </Link>
            </div>
          </div>

          {/* Right Column: Brief Timeline preview */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded border border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <span className="section-label text-[var(--accent-bengali)]">JOURNEY</span>
              <span className="text-xs font-mono text-[var(--text-faint)]">2019 — 2026</span>
            </div>

            <div className="relative border-l border-[var(--border)] ml-2 space-y-6">
              {timeline.slice(0, 4).map((entry, idx) => (
                <div key={idx} className="relative pl-5">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-bengali)] border-2 border-[var(--bg)]" />
                  <span className="font-mono text-xs text-[var(--text-faint)] block mb-0.5">
                    {entry.period}
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text)] font-medium">
                    {isBn ? entry.eventBn : entry.eventEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <Link
                href="/about#timeline"
                className="text-xs font-mono text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
              >
                {isBn ? 'সম্পূর্ণ টাইমলাইন দেখুন →' : 'View full timeline →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
