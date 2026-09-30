'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, ExternalLink, ArrowRight, Github } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { projects, type ProjectStatus, type ProjectCategory } from '@/data/projects';

const STATUS_LABELS: Record<ProjectStatus, { en: string; bn: string }> = {
  live:       { en: 'Live',       bn: 'লাইভ' },
  building:   { en: 'Building',   bn: 'নির্মাণাধীন' },
  experiment: { en: 'Experiment', bn: 'পরীক্ষামূলক' },
  paused:     { en: 'Paused',     bn: 'বিরতিতে' },
  archived:   { en: 'Archived',   bn: 'সংরক্ষিত' },
  idea:       { en: 'Idea',       bn: 'ধারণা' },
};

const CATEGORIES = [
  { id: 'all',             labelEn: 'All Projects',      labelBn: 'সব প্রজেক্ট' },
  { id: 'bengali-tech',    labelEn: 'Bengali Computing', labelBn: 'বাংলা প্রযুক্তি' },
  { id: 'software',        labelEn: 'Software Products', labelBn: 'সফটওয়্যার পণ্য' },
  { id: 'developer-tools', labelEn: 'Developer Tools',   labelBn: 'ডেভেলপার টুল' },
  { id: 'os-ecosystem',    labelEn: 'OS & Ecosystem',    labelBn: 'ইকোসিস্টেম' },
  { id: 'experiment',      labelEn: 'Experiments',       labelBn: 'এক্সপেরিমেন্ট' },
] as const;

export default function ProjectsCataloguePage() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isBn = language === 'bn';

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat =
        selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameBn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.descriptionBn.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${isBn ? 'font-hind-siliguri' : 'font-sans'}`}>
      <SiteHeader language={language} onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-24 pb-20">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {isBn ? 'হোমে ফিরে যান' : 'Back to Home'}
          </Link>

          <p className="section-label text-[var(--accent-bengali)] mb-2">ARCHIVE</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            {isBn ? 'প্রজেক্ট আর্কাইভ' : 'Projects Archive'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {isBn
              ? 'বাংলা প্রযুক্তি, সফটওয়্যার পণ্য, কম্পাইলার এক্সপেরিমেন্ট এবং ডেভেলপার টুল—যা বানিয়েছি, পরীক্ষা করেছি ও তৈরি করছি।'
              : "Everything I've built, explored, and experimented with — from Bengali computing tools to programming languages and applications."}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pb-6 mb-8 border-b border-[var(--border)]">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    active
                      ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm'
                      : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] bg-[var(--surface)]'
                  }`}
                >
                  {isBn ? cat.labelBn : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[var(--text-faint)] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'প্রজেক্ট বা টেকনোলজি খুঁজুন...' : 'Search projects or tech...'}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded text-xs text-[var(--text)] pl-8 pr-3 py-2 focus:outline-none focus:border-[var(--accent-bengali)] transition-colors placeholder:text-[var(--text-faint)]"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--border)] rounded">
            <p className="text-sm text-[var(--text-muted)]">
              {isBn ? 'কোনো প্রজেক্ট পাওয়া যায়নি।' : 'No projects matched your criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] p-6 rounded transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`status-badge status-${project.status}`}>
                      {isBn ? STATUS_LABELS[project.status].bn : STATUS_LABELS[project.status].en}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-faint)]">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent-bengali)] transition-colors mb-2">
                    <Link href={`/projects/${project.slug}`}>
                      {isBn ? project.nameBn : project.name}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {isBn ? project.descriptionBn : project.description}
                  </p>

                  {/* Highlights if any */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mb-4 space-y-1">
                      {project.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="text-xs text-[var(--text-faint)] flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent-bengali)] shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-[var(--text-faint)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {project.platforms?.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] font-mono text-[var(--accent-tech)] bg-[var(--accent-tech-bg)] px-1.5 py-0.5 rounded"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
                  >
                    {isBn ? 'কেস স্টাডি' : 'Case study'}
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1"
                      >
                        Live
                        <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" aria-hidden="true" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
