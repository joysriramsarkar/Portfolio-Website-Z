'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { featuredProjects, type ProjectStatus } from '@/data/projects';

interface SelectedWorkProps {
  language: 'bn' | 'en';
}

const STATUS_LABELS: Record<ProjectStatus, { en: string; bn: string }> = {
  live:       { en: 'Live',       bn: 'লাইভ' },
  building:   { en: 'Building',   bn: 'নির্মাণাধীন' },
  experiment: { en: 'Experiment', bn: 'পরীক্ষামূলক' },
  paused:     { en: 'Paused',     bn: 'বিরতিতে' },
  archived:   { en: 'Archived',   bn: 'সংরক্ষিত' },
  idea:       { en: 'Idea',       bn: 'ধারণা' },
};

export default function SelectedWork({ language }: SelectedWorkProps) {
  const isBn = language === 'bn';

  return (
    <section id="work" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label text-[var(--accent-bengali)] mb-2">01 / SELECTED WORK</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              {isBn ? 'নির্বাচিত কাজ' : 'Selected Work'}
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors whitespace-nowrap group"
          >
            {isBn ? 'সব প্রজেক্ট দেখুন' : 'View all projects'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Project list */}
        <div className="space-y-0">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="group border-t border-[var(--border)] py-6 grid grid-cols-[auto_1fr] sm:grid-cols-[3rem_1fr_auto] gap-4 sm:gap-6 items-start hover:bg-[var(--surface)] transition-colors rounded px-2 -mx-2">
                {/* Number */}
                <span className="project-number pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent-bengali)] transition-colors">
                      {isBn ? project.nameBn : project.name}
                    </h3>
                    {/* Status badge */}
                    <span className={`status-badge status-${project.status}`}>
                      {isBn
                        ? STATUS_LABELS[project.status].bn
                        : STATUS_LABELS[project.status].en}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed max-w-lg">
                    {isBn ? project.taglineBn : project.tagline}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                      {project.highlights.slice(0, 4).map((h) => (
                        <span key={h} className="section-label text-[var(--text-faint)]">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-[var(--text-faint)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded"
                      >
                        {tech}
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

                {/* Links */}
                <div className="flex flex-col gap-2 items-end pt-0.5 col-span-full sm:col-span-1">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors inline-flex items-center gap-1 group-hover:text-[var(--accent-bengali)]"
                  >
                    {isBn ? 'কেস স্টাডি' : 'Case study'}
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--text-faint)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1"
                      aria-label={`Open ${project.name} live site`}
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
                      className="text-xs text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {/* Last border */}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
  );
}
