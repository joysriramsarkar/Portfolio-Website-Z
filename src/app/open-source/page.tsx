'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe2, BookOpen, ExternalLink, Star, GitFork, ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { projects } from '@/data/projects';

const WIKIMEDIA_SUMMARY = [
  { wiki: 'bnwiki', nameBn: 'বাংলা উইকিপিডিয়া', nameEn: 'Bengali Wikipedia', edits: 2150, roleBn: 'প্রবন্ধ রচনা ও অনুবাদ', roleEn: 'Article creation & translation' },
  { wiki: 'commonswiki', nameBn: 'উইকিমিডিয়া কমন্স', nameEn: 'Wikimedia Commons', edits: 890, roleBn: 'চিত্র ও মিডিয়া সংরক্ষণ', roleEn: 'Media upload & documentation' },
  { wiki: 'wikidatawiki', nameBn: 'উইকিউপাত্ত (Wikidata)', nameEn: 'Wikidata', edits: 540, roleBn: 'স্ট্রাকচার্ড ডেটা মডেলিংসহ আইটেম তৈরি', roleEn: 'Structured data linking' },
  { wiki: 'bnwikisource', nameBn: 'বাংলা উইকিসংকলন', nameEn: 'Bengali Wikisource', edits: 230, roleBn: 'বাংলা প্রাচীন সাহিত্য ও বই প্রুফরিডিং', roleEn: 'Proofreading Bengali literature' },
  { wiki: 'enwiki', nameBn: 'ইংরেজি উইকিপিডিয়া', nameEn: 'English Wikipedia', edits: 120, roleBn: 'দক্ষিণ এশীয় বিষয়ক সম্পাদনা', roleEn: 'Regional edits & references' },
];

import { useLanguage } from '@/context/LanguageContext';

export default function OpenSourcePage() {
  const { language, isBn, toggleLanguage } = useLanguage();

  const openSourceProjects = projects.filter((p) => p.githubUrl);

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

        {/* Hero */}
        <div className="mb-14">
          <p className="section-label text-[var(--accent-bengali)] mb-2">OPEN KNOWLEDGE & SOURCE</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            {isBn ? 'উন্মুক্ত অবদান ও ওপেন সোর্স' : 'Open Source & Public Contributions'}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {isBn
              ? 'আমার বিশ্বাস, প্রযুক্তি ও জ্ঞানের সবচেয়ে সুন্দর রূপ হলো উন্মুক্ত অংশীদারিত্ব। গিটহাব রিপোজিটরি এবং উইকিমিডিয়া প্রকল্পের মাধ্যমে আমি এই মুক্ত সংস্কৃতির চর্চা করি।'
              : 'I believe technology and human knowledge reach their greatest potential when openly shared. Here is an overview of my public codebases and Wikimedia volunteer contributions.'}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://github.com/joysriramsarkar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--text)] hover:bg-[var(--accent-bengali)] text-[var(--bg)] hover:text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub: @joysriramsarkar
            </a>
            <Link
              href="/contributions"
              className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--border-strong)] px-5 py-2.5 rounded text-sm font-medium transition-colors"
            >
              <Globe2 className="w-4 h-4 text-[var(--accent-tech)]" />
              {isBn ? 'সম্পূর্ণ উইকিমিডিয়া ড্যাশবোর্ড' : 'Live Wikimedia Dashboard'}
            </Link>
          </div>
        </div>

        {/* Section 1: GitHub Codebases */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border)]">
            <div>
              <span className="section-label text-[var(--accent-bengali)]">01 / REPOSITORIES</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1">
                {isBn ? 'ওপেন-সোর্স কোড রিপোজিটরি' : 'Curated Open Source Repositories'}
              </h2>
            </div>
            <a
              href="https://github.com/joysriramsarkar?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
            >
              {isBn ? 'সব রিপোজিটরি' : 'All repos'}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openSourceProjects.map((p) => (
              <div
                key={p.slug}
                className="p-5 rounded border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[var(--accent-tech)]">
                      {p.category}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-faint)]">
                      {p.year}
                    </span>
                  </div>

                  <h3 className="font-semibold text-base text-[var(--text)] mb-2">
                    {isBn ? p.nameBn : p.name}
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                    {isBn ? p.taglineBn : p.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-[var(--text-faint)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <Link href={`/projects/${p.slug}`} className="text-[var(--accent-bengali)] hover:underline">
                    {isBn ? 'কেস স্টাডি' : 'Overview'}
                  </Link>
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Wikimedia Contributions */}
        <div className="p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border)]">
            <div>
              <span className="section-label text-[var(--accent-tech)]">02 / WIKIMEDIA VOLUNTEER WORK</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1">
                {isBn ? 'উইকিমিডিয়া অবদান সারসংক্ষেপ' : 'Wikimedia Contribution Summary'}
              </h2>
            </div>
            <Link
              href="/contributions"
              className="text-xs font-mono text-[var(--accent-tech)] hover:underline inline-flex items-center gap-1"
            >
              {isBn ? 'লাইভ এপিআই ড্যাশবোর্ড →' : 'Live API Dashboard →'}
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {WIKIMEDIA_SUMMARY.map((w) => (
              <div key={w.wiki} className="p-4 rounded border border-[var(--border)] bg-[var(--bg)]">
                <span className="text-xs font-mono text-[var(--accent-bengali)] font-semibold block mb-1">
                  {w.edits.toLocaleString(isBn ? 'bn-BD' : 'en-US')} {isBn ? 'সম্পাদনা' : 'Edits'}
                </span>
                <h3 className="font-semibold text-sm text-[var(--text)] mb-1">
                  {isBn ? w.nameBn : w.nameEn}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {isBn ? w.roleBn : w.roleEn}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--text-faint)] leading-relaxed">
            {isBn
              ? 'ইউজারনেম: জয়শ্রীরাম সরকার · উইকিমিডিয়া প্রকল্পের বিভিন্ন ভাষা ও প্ল্যাটফর্মে সক্রিয় অবদানকারী।'
              : 'Global Wikimedia Username: জয়শ্রীরাম সরকার · Active contributor across multiple wiki projects and regional knowledge initiatives.'}
          </p>
        </div>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
