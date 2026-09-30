'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Contribution {
  wiki: string;
  url: string;
  editcount: number;
}

interface TranslationContent {
  wikimediaContributions: string;
  wikiNames: Record<string, string>;
  edits: string;
  viewContributions: string;
  viewAllContributions: string;
}

interface WikimediaContributionsProps {
  language: 'bn' | 'en';
  translations: Record<string, TranslationContent>;
}

const WIKIMEDIA_USERNAME = 'জয়শ্রীরাম সরকার';

async function getWikimediaContributions(): Promise<Contribution[]> {
  const encodedUsername = encodeURIComponent(WIKIMEDIA_USERNAME);
  const apiUrl = `https://meta.wikimedia.org/w/api.php?action=query&meta=globaluserinfo&guiuser=${encodedUsername}&guiprop=merged&format=json&origin=*`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        // User-Agent সঠিক site URL দিয়ে আপডেট করা হয়েছে
        'Api-User-Agent': 'JoysriramPortfolio/1.0 (https://joysriram.com; joysriram.sarkar.56@gmail.com)',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch Wikimedia contributions');

    const data = await response.json();
    const contributions: Contribution[] = data?.query?.globaluserinfo?.merged ?? [];

    return contributions
      .filter((contrib) => contrib.editcount > 0)
      .sort((a, b) => b.editcount - a.editcount);
  } catch (error) {
    console.error('Wikimedia API Error:', error);
    return [];
  }
}

export default function WikimediaContributions({ language, translations }: WikimediaContributionsProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    // language dependency সরানো হয়েছে:
    // ভাষা বদলালে Wikimedia edit count বদলায় না, শুধু UI text বদলায়।
    getWikimediaContributions().then((data) => {
      setContributions(data);
      setLoading(false);
    });
  }, []); // শুধু mount-এ একবার fetch

  const topContributions = contributions.slice(0, 4);

  return (
    <section className="py-16 bg-slate-950" aria-label="Wikimedia Contributions">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-wide text-sm flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Open Source
          </p>
          {/* Design language unified: cyan/blue (amber/yellow সরানো হয়েছে) */}
          <h2 className="text-3xl md:text-4xl font-bold bg-[linear-gradient(to_right,theme(colors.cyan.400),theme(colors.blue.600))] bg-clip-text text-transparent">
            {t.wikimediaContributions}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[180px] w-full bg-slate-800 rounded-xl" />
            ))}
          </div>
        ) : contributions.length === 0 ? null : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {topContributions.map((contrib, index) => (
                <motion.div
                  key={contrib.wiki}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug font-hind-siliguri">
                    {(t.wikiNames && t.wikiNames[contrib.wiki]) || contrib.wiki}
                  </h3>
                  <p className="text-4xl font-bold text-cyan-400 mb-1">
                    {contrib.editcount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-IN')}
                  </p>
                  <p className="text-slate-400 text-sm mb-4">{t.edits}</p>
                  <a
                    href={`${contrib.url}/wiki/Special:Contributions/${encodeURIComponent(WIKIMEDIA_USERNAME)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                    aria-label={`View contributions on ${(t.wikiNames && t.wikiNames[contrib.wiki]) || contrib.wiki}`}
                  >
                    {t.viewContributions}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </motion.div>
              ))}
            </div>

            {contributions.length > 4 && (
              <div className="text-center mt-10">
                <Link href="/contributions" passHref>
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold px-8 py-5 transition-all"
                  >
                    {t.viewAllContributions} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}