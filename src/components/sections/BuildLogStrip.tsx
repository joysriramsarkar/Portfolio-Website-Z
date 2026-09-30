import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildLog } from '@/data/content';

interface BuildLogStripProps {
  language: 'bn' | 'en';
}

function formatDate(iso: string, lang: 'bn' | 'en'): string {
  const date = new Date(iso);
  if (lang === 'bn') {
    return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// RSC — no 'use client' needed
export default function BuildLogStrip({ language }: BuildLogStripProps) {
  const isBn = language === 'bn';
  const recent = buildLog.slice(0, 5);

  return (
    <section className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label text-[var(--accent-bengali)] mb-2">03 / BUILD LOG</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              {isBn ? 'বিল্ড লগ' : 'Build Log'}
            </h2>
            <p className="prose-editorial mt-2">
              {isBn ? 'Technical journal — আমি কী করছি' : 'A record of what I\'m building and learning'}
            </p>
          </div>
          <Link
            href="/now"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors whitespace-nowrap group"
          >
            {isBn ? 'এখন কী করছি' : 'What I\'m doing now'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-0">
          {recent.map((entry, i) => (
            <div key={entry.date} className="border-t border-[var(--border)] py-4 grid grid-cols-[7rem_1fr] gap-4">
              <time
                dateTime={entry.date}
                className="section-label text-[var(--text-faint)] pt-0.5 whitespace-nowrap"
              >
                {formatDate(entry.date, language)}
              </time>
              <ul className="space-y-1.5">
                {entry.entries.map((e, j) => (
                  <li key={j} className="text-sm text-[var(--text-muted)] flex gap-2">
                    <span className="text-[var(--accent-bengali)] mt-0.5 shrink-0">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
  );
}
