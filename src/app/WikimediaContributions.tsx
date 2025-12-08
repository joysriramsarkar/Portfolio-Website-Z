"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Contribution {
  wiki: string;
  url: string;
  editcount: number;
}

interface TranslationContent {
  wikimediaContributions: string;
  wikiNames: { [key: string]: string };
  edits: string;
  viewContributions: string;
  viewAllContributions: string;
}

interface WikimediaContributionsProps {
  language: "bn" | "en";
  translations: { [key: string]: TranslationContent };
}

const WIKIMEDIA_USERNAME = "জয়শ্রীরাম সরকার";

async function getWikimediaContributions(): Promise<Contribution[]> {
  const encodedUsername = encodeURIComponent(WIKIMEDIA_USERNAME);
  const apiUrl = `https://meta.wikimedia.org/w/api.php?action=query&meta=globaluserinfo&guiuser=${encodedUsername}&guiprop=merged&format=json&origin=*`;

  try {
    const response = await fetch(apiUrl, {
      headers: { "Api-User-Agent": "MyCoolTool/1.1 (https://example.org/cool-tool/)" }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Wikimedia contributions");
    }

    const data = await response.json();
    const contributions: Contribution[] = data.query.globaluserinfo.merged;

    // শুধুমাত্র যেগুলোতে অবদান আছে (editcount > 0) সেগুলো ফিল্টার করা হচ্ছে
    return contributions
      .filter((contrib) => contrib.editcount > 0)
      .sort((a, b) => b.editcount - a.editcount); // অবদানের সংখ্যা অনুযায়ী সাজানো
  } catch (error) {
    console.error("Wikimedia API Error:", error);
    return []; // কোনো সমস্যা হলে খালি অ্যারে রিটার্ন করবে
  }
}

export default function WikimediaContributions({ language, translations }: WikimediaContributionsProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getWikimediaContributions();
      setContributions(data);
      setLoading(false);
    }
    fetchData();
  }, [language]); // ভাষা পরিবর্তন হলে ডেটা রি-ফেচ করার জন্য language যোগ করা হলো

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            {t.wikimediaContributions}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full bg-gray-800" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (contributions.length === 0) {
    return null;
  }

  const topContributions = contributions.slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
          {t.wikimediaContributions}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topContributions.map((contrib) => (
            <div key={contrib.wiki} className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-semibold font-hind-siliguri mb-2">
                {(t.wikiNames && t.wikiNames[contrib.wiki]) || contrib.wiki}
              </h3>
              <p className="text-4xl font-bold text-primary mb-4">
                {contrib.editcount.toLocaleString("bn-BD")}
              </p>
              <p className="text-muted-foreground mb-4">{t.edits}</p>
              <a
                href={`${contrib.url}/wiki/Special:Contributions/${encodeURIComponent(WIKIMEDIA_USERNAME)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center"
              >
                {t.viewContributions} <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
        {contributions.length > 4 && (
          <div className="text-center mt-12">
            <Link href="/contributions" passHref>
              <Button
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-semibold px-8 py-6 text-lg transition-all"
              >
                {t.viewAllContributions} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}