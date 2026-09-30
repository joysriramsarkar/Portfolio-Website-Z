'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Globe2, BookOpen } from 'lucide-react';

interface OpenSourceStripProps {
  language: 'bn' | 'en';
}

export default function OpenSourceStrip({ language }: OpenSourceStripProps) {
  const isBn = language === 'bn';

  const cards = [
    {
      icon: Github,
      titleEn: 'GitHub Repositories',
      titleBn: 'গিটহাব প্রজেক্টসমূহ',
      count: '20+',
      descEn: 'Public repositories spanning web applications, developer CLI tools, and Bengali computing experiments.',
      descBn: 'ওয়েব অ্যাপ্লিকেশন, ডেভেলপার সিএলআই টুল ও বাংলা কম্পিউটিং সংক্রান্ত উন্মুক্ত কোড রিপোজিটরি।',
      link: 'https://github.com/joysriramsarkar',
      isExternal: true,
      badge: 'Code'
    },
    {
      icon: Globe2,
      titleEn: 'Wikimedia Contributions',
      titleBn: 'উইকিমিডিয়া অবদান',
      count: '3,800+',
      descEn: 'Active edits across Bengali Wikipedia, Wikimedia Commons, Wikidata, and Bengali Wikisource.',
      descBn: 'বাংলা উইকিপিডিয়া, উইকিমিডিয়া কমন্স, উইকিউপাত্ত এবং উইকিসংকলনে সক্রিয় সম্পাদনা ও অবদান।',
      link: '/contributions',
      isExternal: false,
      badge: 'Community'
    },
    {
      icon: BookOpen,
      titleEn: 'Onuron Ecosystem',
      titleBn: 'অনুরণ ইকোসিস্টেম',
      count: 'Open Source',
      descEn: 'An independent long-term research exploring language design, terminal utilities, and personal computing.',
      descBn: 'প্রোগ্রামিং ভাষার নকশা, টার্মিনাল ইউটিলিটি ও নিজস্ব কম্পিউটিং সিস্টেম নিয়ে উন্মুক্ত দীর্ঘমেয়াদি গবেষণা।',
      link: '/projects/onuron',
      isExternal: false,
      badge: 'R&D'
    }
  ];

  return (
    <section id="open-source" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label text-[var(--accent-bengali)] mb-2">04 / OPEN SOURCE</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              {isBn ? 'উন্মুক্ত অবদান ও ওপেন সোর্স' : 'Open Source & Public Work'}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {isBn
                ? 'জ্ঞানের উন্মুক্ত বিস্তার ও কমিউনিটির অংশ হিসেবে তৈরি প্রকল্পসমূহ।'
                : 'Free knowledge, community contributions, and public software exploration.'}
            </p>
          </div>

          <Link
            href="/open-source"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-bengali)] hover:underline whitespace-nowrap font-medium group"
          >
            {isBn ? 'সব অবদান দেখুন' : 'Explore all contributions'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.titleEn}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="p-6 rounded border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-bengali)] border border-[var(--border)]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="section-label text-[var(--text-faint)]">
                      {c.badge}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-xl font-bold font-mono text-[var(--text)]">
                      {c.count}
                    </span>
                    <h3 className="font-semibold text-base text-[var(--text)] mt-1">
                      {isBn ? c.titleBn : c.titleEn}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                    {isBn ? c.descBn : c.descEn}
                  </p>
                </div>

                {c.isExternal ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-bengali)] hover:underline"
                  >
                    {isBn ? 'গিটহাবে দেখুন' : 'View on GitHub'}
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={c.link}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-bengali)] hover:underline"
                  >
                    {isBn ? 'বিস্তারিত দেখুন' : 'View details'}
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
