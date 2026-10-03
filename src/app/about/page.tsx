'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Code2, Compass, CheckCircle2, Award, Terminal } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { timeline } from '@/data/content';

const CAPABILITIES = [
  { nameEn: 'Web UI & Design System Implementation', nameBn: 'ওয়েব ইউআই ও ডিজাইন সিস্টেম বাস্তবায়ন', level: 'Comfortable', levelBn: 'দক্ষ / স্বাচ্ছন্দ্য', pct: 90 },
  { nameEn: 'AI-assisted Development & Prompt Engineering', nameBn: 'এআই-সহায়ক উন্নয়ন ও সিস্টেম প্রম্পটিং', level: 'Comfortable', levelBn: 'দক্ষ / স্বাচ্ছন্দ্য', pct: 92 },
  { nameEn: 'Bengali-first UX & Grapheme Architecture', nameBn: 'বাংলা-প্রথম ইউএক্স ও গ্রাফিম আর্কিটেকচার', level: 'Comfortable', levelBn: 'দক্ষ / স্বাচ্ছন্দ্য', pct: 88 },
  { nameEn: 'Product Prototyping & Architecture Planning', nameBn: 'প্রোডাক্ট প্রোটোটাইপিং ও আর্কিটেকচার পরিকল্পনা', level: 'Comfortable', levelBn: 'দক্ষ / স্বাচ্ছন্দ্য', pct: 85 },
  { nameEn: 'Database Schema Design (SQLite, Prisma, Supabase)', nameBn: 'ডেটাবেস স্কিমা ডিজাইন ও কুয়েরি অপটিমাইজেশন', level: 'Working knowledge', levelBn: 'কার্যকর জ্ঞান', pct: 75 },
  { nameEn: 'Python Scripting & Automation Tools', nameBn: 'পাইথন স্ক্রিপ্টিং ও অটোমেশন টুলস', level: 'Working knowledge', levelBn: 'কার্যকর জ্ঞান', pct: 72 },
  { nameEn: 'Native Android Development', nameBn: 'নেটিভ অ্যান্ড্রয়েড ডেভেলপমেন্ট', level: 'Learning', levelBn: 'শিক্ষানবিস / চর্চা', pct: 55 },
  { nameEn: 'Compilers, AST & Language Design (Nilang)', nameBn: 'কম্পাইলার, এএসটি ও ল্যাঙ্গুয়েজ ডিজাইন', level: 'Exploring', levelBn: 'পরীক্ষামূলক অন্বেষণ', pct: 45 },
];

export default function AboutPage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const isBn = language === 'bn';

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

        {/* Narrative Intro + Portrait */}
        <div className="mb-14 grid md:grid-cols-[1fr_260px] gap-8 lg:gap-12 items-start">
          <div>
            <p className="section-label text-[var(--accent-bengali)] mb-2">ABOUT JOYSRIRAM</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-6">
              {isBn
                ? 'আমি প্রথাগত ধারায় আসিনি, এসেছি তৈরি করার তাগিদে'
                : 'I didn’t enter technology through traditional credentials. I came into it by building.'}
            </h1>

            <div className="space-y-5 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed prose-editorial">
              <p>
                {isBn
                  ? 'আমার পড়াশোনা বা যাত্রা কোনো প্রথাগত কম্পিউটার সায়েন্স বিভাগের ক্লাসরুম থেকে শুরু হয়নি। ২০১৯ সালে আমি বাংলা সাহিত্য ও কবিতার জগতে নিমগ্ন ছিলাম। কিন্তু যত সময় গেছে, বুঝতে পেরেছি যে প্রযুক্তি কেবল একটি কারিগরি পেশা নয়—এটি চিন্তার প্রকাশের সবচেয়ে শক্তিশালী মাধ্যম।'
                  : 'My journey did not begin in a conventional university computer science lecture hall. In 2019, I was deeply immersed in Bengali literature and poetic expression. Over time, I realized computing is not merely an engineering discipline—it is the most dynamic canvas for human thought and problem-solving.'}
              </p>
              <p>
                {isBn
                  ? '২০২০ সাল থেকে নিজে নিজে লিনাক্স চালানো, নেটওয়ার্কিং শেখা এবং ছোট ছোট স্ক্রিপ্ট লেখার মাধ্যমে আমার প্রযুক্তির সাথে নিবিড় সম্পর্ক গড়ে ওঠে। আমি প্রতিটি জিনিস হাত দিয়ে বানিয়ে শিখেছি। ভুল হয়েছে, বারবার পরীক্ষা করেছি, এবং আস্তে আস্তে বাংলা টাইপিং, বাংলাগান ও চালাও-এর মতো বাস্তব পণ্য দাঁড় করিয়েছি।'
                  : 'From 2020 onward, self-hosting Linux systems, understanding networking protocols, and scripting in Python built my technical grounding. Every concept was learned through hands-on fabrication: breaking code, refactoring architectures, and incrementally constructing real software like Bangla Typing, BanglaGan, and POS systems.'}
              </p>
              <p>
                {isBn
                  ? 'আজ আমি AI-সহায়ক ডেভেলপমেন্ট ওয়ার্কফ্লো ব্যবহার করি। এটি আমাকে দ্রুত প্রোটোটাইপিং থেকে শুরু করে পূর্ণাঙ্গ সফটওয়্যার তৈরি করতে সাহায্য করে। তবে সিস্টেম আর্কিটেকচার, ব্যবহারকারীর অনুভূতি এবং কোডের দায়ভার সবসময় আমার নিজের।'
                  : 'Today, I leverage an AI-assisted development workflow as an accelerator for prototyping and implementation. Yet the architecture design, edge-case testing, Bengali typographic empathy, and final code responsibility remain strictly mine.'}
              </p>
            </div>
          </div>

          {/* Author Portrait Card */}
          <div className="bg-[var(--surface)] p-2.5 rounded border border-[var(--border)] shadow-sm">
            <div className="relative aspect-[4/5] w-full rounded overflow-hidden bg-[var(--surface-2)]">
              <Image
                src="/profile.webp"
                alt={isBn ? "জয়শ্রীরাম সরকার — প্রতিকৃতি" : "Joysriram Sarkar — Portrait"}
                fill
                priority
                quality={95}
                sizes="(min-width: 768px) 260px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-3 px-1">
              <p className="text-xs font-semibold text-[var(--text)]">
                {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
              </p>
              <p className="text-[11px] font-mono text-[var(--text-faint)] mt-0.5">
                {isBn ? 'শিলিগুড়ি, পশ্চিমবঙ্গ · ভারত' : 'Siliguri, West Bengal · India'}
              </p>
              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                <span>{isBn ? 'অভিজ্ঞতা' : 'Focus'}</span>
                <span className="text-[var(--accent-bengali)] font-semibold">{isBn ? '২০১৯ থেকে' : 'Since 2019'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div id="timeline" className="mb-16 p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="section-label text-[var(--accent-bengali)]">CHRONOLOGY</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1">
                {isBn ? 'শেখার ও কাজের পথচলা (২০১৯ – ২০২৬)' : 'Evolution & Milestones (2019 – 2026)'}
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-faint)]">JOURNEY</span>
          </div>

          <div className="relative border-l-2 border-[var(--border)] ml-3 space-y-8">
            {timeline.map((entry, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[var(--accent-bengali)] border-2 border-[var(--bg)]" />
                <span className="font-mono text-xs text-[var(--accent-tech)] font-semibold block mb-1">
                  {entry.period}
                </span>
                <p className="text-sm sm:text-base text-[var(--text)] font-medium">
                  {isBn ? entry.eventBn : entry.eventEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Capability Matrix */}
        <div className="mb-16 p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)]">
          <div className="mb-8 pb-4 border-b border-[var(--border)]">
            <span className="section-label text-[var(--accent-tech)]">HONEST CAPABILITIES</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1">
              {isBn ? 'আমি আজ বাস্তবে কী করতে পারি' : 'What I Can Actually Do Today'}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {isBn
                ? 'কৃত্রিম স্কোর নয়, বরং বাস্তব সক্ষমতার সৎ মূল্যায়ন।'
                : 'Not inflated vanity numbers, but an honest assessment of current technical proficiency.'}
            </p>
          </div>

          <div className="space-y-5">
            {CAPABILITIES.map((cap) => (
              <div key={cap.nameEn}>
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium mb-1.5">
                  <span className="text-[var(--text)]">{isBn ? cap.nameBn : cap.nameEn}</span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {isBn ? cap.levelBn : cap.level}
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--surface-2)] rounded-full overflow-hidden border border-[var(--border)]">
                  <div
                    className="h-full bg-[var(--accent-bengali)] rounded-full transition-all duration-500"
                    style={{ width: `${cap.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Methodology */}
        <div className="p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)]">
          <span className="section-label text-[var(--accent-bengali)] block mb-2">METHODOLOGY</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-6">
            {isBn ? 'কাজের ৬-ধাপের কর্মপদ্ধতি' : 'The 6-Step Engineering Workflow'}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: '01', titleEn: 'Define', titleBn: 'সংজ্ঞায়িত করা', descEn: 'Deconstruct problems into written specifications.', descBn: 'সমস্যাটিকে স্পষ্টভাবে লিখে ছোট ছোট ইউনিটে ভাঙা।' },
              { num: '02', titleEn: 'Design', titleBn: 'পরিকল্পনা ও নকশা', descEn: 'Architect data schemas, UX, and state transitions.', descBn: 'ইউজার ইন্টারফেস ও ডেটা ফ্লো আর্কিটেকচার পরিকল্পনা করা।' },
              { num: '03', titleEn: 'AI Implement', titleBn: 'AI-সহায়ক কোডিং', descEn: 'Accelerate modular code implementation with AI tools.', descBn: 'AI সহকারী ব্যবহার করে মডুলার কোড দ্রুত ইমপ্লিমেন্ট করা।' },
              { num: '04', titleEn: 'Test & Verify', titleBn: 'পরীক্ষা ও ভেরিফিকেশন', descEn: 'Rigorous viewport testing and accessibility checks.', descBn: 'ব্রাউজার ভিউপোর্ট, পারফরম্যান্স ও এক্সেসিবিলিটি পরীক্ষা।' },
              { num: '05', titleEn: 'Debug', titleBn: 'ত্রুটি সংশোধন', descEn: 'Systematically isolate and patch edge cases.', descBn: 'লগ ও এরর ট্রেস করে ত্রুটি সমাধান করা।' },
              { num: '06', titleEn: 'Refine', titleBn: 'উন্নয়ন ও পালিশ', descEn: 'Polish typography, responsive wrapping, and docs.', descBn: 'টাইপোগ্রাফি, সাবপিক্সেল গ্রিড ও ডকুমেন্টেশন উন্নত করা।' },
            ].map((s) => (
              <div key={s.num} className="p-4 rounded border border-[var(--border)] bg-[var(--bg)]">
                <span className="project-number text-xs mb-2 block">{s.num}</span>
                <h3 className="font-semibold text-sm text-[var(--text)] mb-1">
                  {isBn ? s.titleBn : s.titleEn}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {isBn ? s.descBn : s.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
