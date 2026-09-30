'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { labItems } from '@/data/content';

interface LabTeaserProps {
  language: 'bn' | 'en';
}

const STATUS_CONFIG: Record<string, { labelEn: string; labelBn: string; color: string }> = {
  building:     { labelEn: 'Building',     labelBn: 'নির্মাণাধীন', color: 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
  learning:     { labelEn: 'Learning',     labelBn: 'শিখছি',       color: 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800' },
  experimenting:{ labelEn: 'Experimenting',labelBn: 'পরীক্ষা',      color: 'text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800' },
  testing:      { labelEn: 'Testing',      labelBn: 'টেস্টিং',      color: 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
};

export default function LabTeaser({ language }: LabTeaserProps) {
  const isBn = language === 'bn';

  return (
    <section id="lab" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-4 h-4 text-[var(--accent-tech)]" aria-hidden="true" />
              <p className="section-label text-[var(--accent-tech)]">03 / THE LAB</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              {isBn ? 'ডিজিটাল ল্যাব' : 'The Lab'}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {isBn
                ? 'বর্তমানে যেসব প্রযুক্তি, ধারণা ও বিষয় নিয়ে গবেষণা ও অনুশীলন করছি।'
                : 'Things I am currently figuring out, experimenting with, and researching.'}
            </p>
          </div>

          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-tech)] hover:underline whitespace-nowrap font-medium group"
          >
            {isBn ? 'ল্যাবে প্রবেশ করুন' : 'Enter the Lab'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* 4 Featured items in grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {labItems.slice(0, 4).map((item, idx) => {
            const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.learning;
            return (
              <motion.div
                key={item.nameEn}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-5 rounded border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${cfg.color}`}>
                      {isBn ? cfg.labelBn : cfg.labelEn}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-faint)]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-[var(--text)] mb-2">
                    {isBn ? item.nameBn : item.nameEn}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {isBn ? item.descBn : item.descEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
