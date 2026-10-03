'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Hammer, GraduationCap, Compass, BookOpen, Sparkles } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';

interface NowItem {
  name: string;
  desc: string;
  link?: string;
}

interface NowSection {
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleBn: string;
  color: string;
  items: NowItem[];
}

import { useLanguage } from '@/context/LanguageContext';

export default function NowPage() {
  const { language, isBn, toggleLanguage } = useLanguage();

  const sections: NowSection[] = [
    {
      icon: Hammer,
      titleEn: 'What I Am Building',
      titleBn: 'এখন কী তৈরি করছি',
      color: 'text-[var(--accent-bengali)]',
      items: [
        {
          name: isBn ? 'বাংলা টাইপিং (Bangla Typing)' : 'Bangla Typing',
          desc: isBn
            ? '১৩টি স্তর ও ৬১টি পাঠের পূর্ণাঙ্গ শিক্ষামূলক টাইপিং টেস্ট ও সার্টিফিকেট ব্যবস্থা।'
            : 'Structured Bengali typing curriculum with 61 lessons and real-time grapheme engine.',
          link: '/projects/bangla-typing'
        },
        {
          name: isBn ? 'বাংলাগান (BanglaGan)' : 'BanglaGan',
          desc: isBn
            ? 'বাংলা গানের সম্পূর্ণ মেটাডেটা, লিরিক্স ও ক্রস-প্ল্যাটফর্ম মিউজিক আবিষ্কার প্ল্যাটফর্ম।'
            : 'Cross-platform Bengali music metadata, lyrics, and discovery platform.',
          link: '/projects/banglagan'
        },
        {
          name: isBn ? 'পয়েন্ট অব সেল (POS App)' : 'POS & Inventory',
          desc: isBn
            ? 'অফলাইন-প্রথম PWA মোড, রিসিট প্রিন্টিং ও ইনভেন্টরি ম্যানেজমেন্ট সফটওয়্যার।'
            : 'Offline-first PWA inventory tracking and thermal receipt printing system.',
          link: '/projects/pos'
        },
        {
          name: isBn ? 'চালাও (Chalao)' : 'Chalao Ridesharing',
          desc: isBn
            ? 'রাইডার, ড্রাইভার ও অ্যাডমিনের জন্য বহু-অ্যাপ আর্কিটেকচার সমন্বিত প্ল্যাটফর্ম।'
            : 'Multi-layer ride sharing service with synchronized client and driver interfaces.',
          link: '/projects/chalao'
        }
      ]
    },
    {
      icon: GraduationCap,
      titleEn: 'What I Am Learning',
      titleBn: 'এখন কী শিখছি',
      color: 'text-[var(--accent-tech)]',
      items: [
        {
          name: isBn ? 'CSS লেআউট ও রেসপনসিভ আর্কিটেকচার' : 'CSS Sizing & Layout Systems',
          desc: isBn
            ? 'স্ক্রিনের ফিজিক্যাল ডাইমেনশন বনাম সিএসএস পিক্সেল রেন্ডারিং এবং সাবপিক্সেল গ্রিড।'
            : 'Deep-dive into viewport units, layout containment, and fluid typography.'
        },
        {
          name: isBn ? 'পাইথন ও ব্যাকএন্ড অটোমেশন' : 'Python & Automation Scripting',
          desc: isBn
            ? 'ডেটা প্রসেসিং, স্ক্র্যাপিং এবং ব্যাকএন্ড সার্ভিস অটোমেশন টুলিং।'
            : 'Data scraping, structured transformations, and CLI scripting pipelines.'
        },
        {
          name: isBn ? 'মেশিন লার্নিং ও গণিত' : 'AI Mathematics Fundamentals',
          desc: isBn
            ? 'লিনিয়ার অ্যালজেব্রা, প্রোবাবিলিটি এবং নিউরাল নেটওয়ার্কের অভ্যন্তরীণ গণিত।'
            : 'Linear algebra, vector embeddings, and probabilistic foundation intuition.'
        }
      ]
    },
    {
      icon: Compass,
      titleEn: 'What I Am Exploring',
      titleBn: 'এখন কী পরীক্ষা-নিরীক্ষা করছি',
      color: 'text-amber-600 dark:text-amber-400',
      items: [
        {
          name: isBn ? 'নীলং (Nilang Programming Language)' : 'Nilang Toy Language',
          desc: isBn
            ? 'লেক্সার, অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) এবং ইন্টারপ্রেটার ডিজাইন।'
            : 'Recursive-descent parsing and AST evaluation for custom scripting experiments.',
          link: '/projects/nilang'
        },
        {
          name: isBn ? 'অনুরণ ইকোসিস্টেম (Onuron Ecosystem)' : 'Onuron Computing Architecture',
          desc: isBn
            ? 'টার্মিনাল-ফার্স্ট অ্যাপ্লিকেশন এবং বাংলাবান্ধব ডেভেলপার ওয়ার্কস্পেস।'
            : 'Long-term research on personal computing systems and terminal utilities.',
          link: '/projects/onuron'
        }
      ]
    },
    {
      icon: BookOpen,
      titleEn: 'What I Am Reading & Studying',
      titleBn: 'এখন কী পড়ছি ও অধ্যয়ন করছি',
      color: 'text-emerald-600 dark:text-emerald-400',
      items: [
        {
          name: isBn ? 'সফটওয়্যার স্থাপত্য ও সিস্টেম ডিজাইন' : 'Software Architecture & System Design',
          desc: isBn
            ? 'ডকুমেন্টেশন, ডেটাবেস নরমালাইজেশন এবং অফলাইন-ফার্স্ট সিঙ্ক স্ট্র্যাটেজি।'
            : 'Offline-first state synchronization, relational schemas, and component isolation.'
        },
        {
          name: isBn ? 'বাংলা সাহিত্য ও আধুনিক কবিতা' : 'Bengali Literature & Cultural Essays',
          desc: isBn
            ? 'ভাষাগত সংবেদনশীলতা এবং ডিজিটাল মাধ্যমে বাংলা ফন্ট ও টাইপোগ্রাফির ইতিহাস।'
            : 'Literary works, poetry, and typography aesthetics in digital mediums.'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${isBn ? 'font-hind-siliguri' : 'font-sans'}`}>
      <SiteHeader language={language} onToggleLanguage={toggleLanguage} />

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 pt-24 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          {isBn ? 'হোমে ফিরে যান' : 'Back to Home'}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[var(--accent-bengali)]" />
            <p className="section-label text-[var(--accent-bengali)]">NOW PAGE</p>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            {isBn ? 'আমি এখন কী করছি' : 'What I am Doing Now'}
          </h1>
          <p className="text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            {isBn
              ? 'এটি ডেরেক সিভার্সের /now পেজ ধারণা থেকে অনুপ্রাণিত—বর্তমান সময়ের অগ্রাধিকার, চলমান কাজ এবং চিন্তা।'
              : 'Inspired by Derek Sivers’ /now page movement — a snapshot of my current priorities, focus areas, and active work.'}
          </p>
          <p className="text-xs font-mono text-[var(--text-faint)] mt-4">
            {isBn ? 'সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬ · শিলিগুড়ি, ভারত' : 'Last updated: September 2026 · Siliguri, India'}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.titleEn} className="p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border)]">
                  <Icon className={`w-5 h-5 ${sec.color}`} aria-hidden="true" />
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--text)]">
                    {isBn ? sec.titleBn : sec.titleEn}
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {sec.items.map((item) => (
                    <div key={item.name} className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-[var(--text)] mb-1.5">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      {item.link && (
                        <div className="mt-3">
                          <Link
                            href={item.link}
                            className="text-xs font-medium text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
                          >
                            {isBn ? 'প্রজেক্ট দেখুন →' : 'View project →'}
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
