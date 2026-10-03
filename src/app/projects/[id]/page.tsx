import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Cpu, Database, Globe, ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/Footer';
import { projects, getProject, type ProjectStatus } from '@/data/projects';

const STATUS_LABELS: Record<ProjectStatus, { en: string; bn: string }> = {
  live:       { en: 'Live',       bn: 'লাইভ' },
  building:   { en: 'Building',   bn: 'নির্মাণাধীন' },
  experiment: { en: 'Experiment', bn: 'পরীক্ষামূলক' },
  paused:     { en: 'Paused',     bn: 'বিরতিতে' },
  archived:   { en: 'Archived',   bn: 'সংরক্ষিত' },
  idea:       { en: 'Idea',       bn: 'ধারণা' },
};

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { lang } = await searchParams;
  const isBn = lang !== 'en';
  const project = getProject(id) || projects.find((p) => p.slug === id.toLowerCase());

  if (!project) return { title: 'Project Not Found' };

  const title = isBn ? `${project.nameBn} (${project.name})` : project.name;
  const description = isBn ? project.descriptionBn : project.description;

  return {
    title: `${title} — কেস স্টাডি`,
    description,
    alternates: {
      canonical: `https://joysriram.com/projects/${project.slug}`,
      languages: {
        bn: `https://joysriram.com/projects/${project.slug}?lang=bn`,
        en: `https://joysriram.com/projects/${project.slug}?lang=en`,
      },
    },
    openGraph: {
      title: `${title} | Joysriram Sarkar`,
      description,
      url: `https://joysriram.com/projects/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang } = await searchParams;
  const isBn = lang !== 'en';

  const project = getProject(id) || projects.find((p) => p.slug === id.toLowerCase());

  if (!project) {
    notFound();
  }

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${isBn ? 'font-hind-siliguri' : 'font-sans'}`}>
      <header className="border-b border-[var(--border)] py-4 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {isBn ? 'সব প্রজেক্টে ফিরে যান' : 'Back to Projects'}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}?lang=${isBn ? 'en' : 'bn'}`}
              className="text-xs font-mono px-2 py-1 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {isBn ? 'EN' : 'বাংলা'}
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-12">
        {/* Project Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`status-badge status-${project.status}`}>
              {isBn ? STATUS_LABELS[project.status].bn : STATUS_LABELS[project.status].en}
            </span>
            <span className="section-label text-[var(--accent-tech)]">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[var(--text-faint)]">
              {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            {isBn ? project.nameBn : project.name}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed mb-6">
            {isBn ? project.taglineBn : project.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--accent-bengali)] hover:bg-[var(--accent-bengali-light)] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
              >
                {isBn ? 'লাইভ প্রজেক্ট দেখুন' : 'Visit live site'}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--border-strong)] px-5 py-2.5 rounded text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                {isBn ? 'সোর্স কোড (গিটহাব)' : 'Source code'}
              </a>
            )}
          </div>
        </div>

        {/* Highlights Strip */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="p-6 rounded border border-[var(--border)] bg-[var(--surface)] mb-12">
            <span className="section-label text-[var(--accent-bengali)] block mb-3">KEY SPECIFICATIONS & HIGHLIGHTS</span>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-bengali)] shrink-0" aria-hidden="true" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem & Solution */}
        {(project.problem || project.solution) && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {project.problem && (
              <div className="p-6 rounded border border-[var(--border)] bg-[var(--surface)]">
                <span className="section-label text-[var(--accent-bengali)] block mb-2">01 / THE PROBLEM</span>
                <h3 className="text-base font-semibold text-[var(--text)] mb-3">
                  {isBn ? 'সমস্যা ও প্রয়োজনীয়তা' : 'The Challenge'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {isBn ? project.problemBn || project.problem : project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-6 rounded border border-[var(--border)] bg-[var(--surface)]">
                <span className="section-label text-[var(--accent-tech)] block mb-2">02 / THE SOLUTION</span>
                <h3 className="text-base font-semibold text-[var(--text)] mb-3">
                  {isBn ? 'সমাধান ও বাস্তবায়ন' : 'The Solution'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {isBn ? project.solutionBn || project.solution : project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Technical Architecture */}
        <div className="p-6 sm:p-8 rounded border border-[var(--border)] bg-[var(--surface)] mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[var(--accent-tech)]" />
            <span className="section-label text-[var(--accent-tech)]">03 / TECHNICAL ARCHITECTURE</span>
          </div>
          <h3 className="text-lg font-bold text-[var(--text)] mb-6">
            {isBn ? 'প্রযুক্তিগত কাঠামো ও ডেটা ফ্লো' : 'System Architecture & Data Flow'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
            <div className="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[10px] font-mono text-[var(--text-faint)] block mb-1">FRONTEND</span>
              <span className="text-xs font-semibold text-[var(--text)]">React / Next.js</span>
            </div>
            <div className="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[10px] font-mono text-[var(--text-faint)] block mb-1">LOGIC</span>
              <span className="text-xs font-semibold text-[var(--text)]">TypeScript</span>
            </div>
            <div className="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[10px] font-mono text-[var(--text-faint)] block mb-1">STORAGE</span>
              <span className="text-xs font-semibold text-[var(--text)]">SQLite / Supabase</span>
            </div>
            <div className="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[10px] font-mono text-[var(--text-faint)] block mb-1">DEPLOYMENT</span>
              <span className="text-xs font-semibold text-[var(--text)]">Vercel / Cloud</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
            <span className="text-xs font-mono text-[var(--text-faint)] py-1">Tech Stack:</span>
            {project.technologies.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-[var(--text)] bg-[var(--surface-2)] px-2 py-0.5 rounded border border-[var(--border)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Lessons Learned */}
        {project.lessons && (
          <div className="p-6 rounded border border-[var(--border)] bg-[var(--surface)] mb-12">
            <span className="section-label text-[var(--accent-bengali)] block mb-2">04 / LESSONS LEARNED</span>
            <h3 className="text-base font-semibold text-[var(--text)] mb-3">
              {isBn ? 'এই প্রজেক্ট থেকে যা শিখেছি' : 'Key Takeaways & Engineering Insights'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {isBn ? project.lessonsBn || project.lessons : project.lessons}
            </p>
          </div>
        )}

        {/* Navigation between projects */}
        <div className="pt-8 border-t border-[var(--border)] flex justify-between items-center">
          <Link
            href="/projects"
            className="text-xs font-medium text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {isBn ? 'সব প্রজেক্টের তালিকা' : 'Back to Catalogue'}
          </Link>
        </div>
      </main>

      <SiteFooter language={isBn ? 'bn' : 'en'} />
    </div>
  );
}
