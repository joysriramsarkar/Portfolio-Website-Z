import { ArrowLeft, ExternalLink, Globe2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import SiteFooter from "@/components/layout/Footer";

type Contribution = {
  wiki: string;
  url: string;
  editcount: number;
};

async function getWikimediaContributions(): Promise<Contribution[]> {
  const username = "জয়শ্রীরাম সরকার";
  const encodedUsername = encodeURIComponent(username);
  const apiUrl = `https://meta.wikimedia.org/w/api.php?action=query&meta=globaluserinfo&guiuser=${encodedUsername}&guiprop=merged&format=json`;

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": `Portfolio-Website-Z/1.0 (https://meta.wikimedia.org/wiki/User:${encodedUsername})`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Wikimedia contributions");
    }

    const data = await response.json();
    const contributions: Contribution[] = data?.query?.globaluserinfo?.merged || [];

    return contributions
      .filter((contrib) => contrib.editcount > 0)
      .sort((a, b) => b.editcount - a.editcount);
  } catch (error) {
    console.error("Wikimedia API Error:", error);
    return [];
  }
}

const WIKI_NAMES: { [key: string]: string } = {
  acewiki: "আচে উইকিপিডিয়া",
  arwiki: "আরবি উইকিপিডিয়া",
  aswiki: "অসমীয়া উইকিপিডিয়া",
  bdwikimedia: "উইকিমিডিয়া বাংলাদেশ",
  "be-x-oldwiki": "বেলারুশীয় উইকিপিডিয়া",
  bnwiki: "বাংলা উইকিপিডিয়া",
  bnwikibooks: "বাংলা উইকিবই",
  bnwikiquote: "বাংলা উইকিউক্তি",
  bnwikisource: "বাংলা উইকিসংকলন",
  bnwikivoyage: "বাংলা উইকিভ্রমণ",
  bnwiktionary: "বাংলা উইকিঅভিধান",
  commonswiki: "উইকিমিডিয়া কমন্স",
  datawiki: "উইকিউপাত্ত",
  wikidatawiki: "উইকিউপাত্ত",
  dewiki: "জার্মান উইকিপিডিয়া",
  enwiki: "ইংরেজি উইকিপিডিয়া",
  hiwiki: "হিন্দি উইকিপিডিয়া",
  mediawikiwiki: "মিডিয়াউইকি",
  metawiki: "মেটা-উইকি",
};

function ContributionsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded animate-pulse"
        >
          <div className="h-4 bg-[var(--surface-2)] rounded w-3/4 mb-3" />
          <div className="h-8 bg-[var(--surface-2)] rounded w-1/2 mb-3" />
          <div className="h-3 bg-[var(--surface-2)] rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}

async function ContributionsList() {
  const contributions = await getWikimediaContributions();

  if (contributions.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-[var(--border)] rounded">
        <p className="text-sm text-[var(--text-muted)]">
          উইকিমিডিয়া অবদানের তথ্য সাময়িকভাবে পাওয়া যায়নি। সরাসরি মেটা-উইকিতে প্রোফাইল দেখতে পারেন।
        </p>
      </div>
    );
  }

  const totalEdits = contributions.reduce((acc, c) => acc + c.editcount, 0);

  return (
    <div>
      <div className="mb-8 p-4 rounded border border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[var(--text-faint)] block mb-0.5">মোট উইকিমিডিয়া সম্পাদনা</span>
          <span className="text-2xl font-bold font-mono text-[var(--accent-bengali)]">
            {totalEdits.toLocaleString("bn-BD")}
          </span>
        </div>
        <div>
          <span className="text-xs font-mono text-[var(--text-faint)] block mb-0.5">সক্রিয় প্রকল্প</span>
          <span className="text-2xl font-bold font-mono text-[var(--text)]">
            {contributions.length.toLocaleString("bn-BD")} টি
          </span>
        </div>
        <a
          href="https://meta.wikimedia.org/wiki/Special:CentralAuth/জয়শ্রীরাম_সরকার"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[var(--accent-tech)] hover:underline inline-flex items-center gap-1"
        >
          গ্লোবাল অ্যাকাউন্ট প্রোফাইল
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributions.map((contrib) => (
          <div
            key={contrib.wiki}
            className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono text-[var(--text-faint)] uppercase block mb-1">
                {contrib.wiki}
              </span>
              <h3 className="text-base font-semibold text-[var(--text)] mb-3">
                {WIKI_NAMES[contrib.wiki] || contrib.wiki}
              </h3>
              <p className="text-2xl font-bold font-mono text-[var(--accent-bengali)] mb-1">
                {contrib.editcount.toLocaleString("bn-BD")}
              </p>
              <p className="text-xs text-[var(--text-muted)]">টি সম্পাদনা সম্পন্ন</p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--border)]">
              <a
                href={`${contrib.url}/wiki/Special:Contributions/${encodeURIComponent("জয়শ্রীরাম সরকার")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent-bengali)] inline-flex items-center gap-1 transition-colors"
                aria-label={`${WIKI_NAMES[contrib.wiki] || contrib.wiki}-এ অবদান দেখুন`}
              >
                অবদান তালিকা দেখুন <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AllContributionsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-hind-siliguri">
      <header className="border-b border-[var(--border)] py-4 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link
            href="/open-source"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-bengali)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            ওপেন সোর্স ড্যাশবোর্ডে ফিরুন
          </Link>
          <span className="text-xs font-mono text-[var(--text-faint)]">
            WIKIMEDIA LIVE API
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-10 pb-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Globe2 className="w-5 h-5 text-[var(--accent-tech)]" />
            <p className="section-label text-[var(--accent-tech)]">VOLUNTEER KNOWLEDGE</p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight mb-3">
            আমার সমস্ত উইকিমিডিয়া অবদান
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            বাংলা উইকিপিডিয়া, উইকিমিডিয়া কমন্স, উইকিউপাত্ত এবং অন্যান্য উইকি প্রকল্পে মুক্ত জ্ঞানচর্চার রিয়েল-টাইম তথ্য।
          </p>
        </div>

        <Suspense fallback={<ContributionsSkeleton />}>
          <ContributionsList />
        </Suspense>
      </main>

      <SiteFooter language="bn" />
    </div>
  );
}