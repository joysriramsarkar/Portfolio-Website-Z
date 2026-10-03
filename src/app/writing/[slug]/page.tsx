import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { articles } from '@/data/writing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const isBn = lang !== 'en';
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const title = isBn ? article.titleBn : article.titleEn;
  const desc = isBn ? article.excerptBn : article.excerptEn;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const isBn = lang !== 'en';

  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const content = isBn ? article.contentBn : article.contentEn;

  return (
    <div
      className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col ${
        isBn ? 'font-hind-siliguri' : 'font-sans'
      }`}
    >
      {/* Minimal header for article pages */}
      <header className="border-b border-[var(--border)] py-4 bg-[var(--bg)] sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {isBn ? 'সব লেখা' : 'All Writing'}
          </Link>
          <Link
            href={`/writing/${slug}?lang=${isBn ? 'en' : 'bn'}`}
            className="text-xs font-mono px-2 py-1 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            {isBn ? 'EN' : 'বাংলা'}
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-5 sm:px-8 py-12">
        {/* Article header */}
        <header className="mb-10 pb-8 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-faint)] mb-4">
            <span className="section-label text-[var(--accent-tech)]">
              {isBn ? article.categoryBn : article.category}
            </span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{isBn ? article.readTimeBn : article.readTimeEn}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] leading-tight mb-5">
            {isBn ? article.titleBn : article.titleEn}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] italic leading-relaxed">
            {isBn ? article.excerptBn : article.excerptEn}
          </p>
        </header>

        {/* Article body */}
        <article className="space-y-6 text-base sm:text-lg text-[var(--text)] leading-relaxed">
          {content.map((paragraph, idx) => (
            <p key={idx} className="leading-[1.85]">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Footer of article */}
        <div className="mt-14 pt-6 border-t border-[var(--border)] flex justify-between items-center">
          <Link
            href="/writing"
            className="text-sm font-medium text-[var(--accent-bengali)] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isBn ? 'সব লেখার তালিকায় ফিরুন' : 'Back to all articles'}
          </Link>
          <span className="text-xs font-mono text-[var(--text-faint)]">
            joysriram.com/writing
          </span>
        </div>
      </main>
    </div>
  );
}
