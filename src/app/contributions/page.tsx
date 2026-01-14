import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

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
      next: { revalidate: 3600 }, // ১ ঘণ্টা পর পর ডেটা রিফ্রেশ হবে
      headers: {
        "User-Agent": `Portfolio-Website-Z/1.0 (https://meta.wikimedia.org/wiki/User:${encodedUsername})`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Wikimedia contributions");
    }

    const data = await response.json();
    const contributions: Contribution[] = data.query.globaluserinfo.merged;

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
  "be-x-oldwiki": "বেলারুশীয় উইকিপিডিয়া (তারাস্কিয়েভিৎসা)",
  betawikiversity: "বেটা উইকিভার্সিটি",
  bnwiki: "বাংলা উইকিপিডিয়া",
  bnwikibooks: "বাংলা উইকিবই",
  bnwikiquote: "বাংলা উইকিউক্তি",
  bnwikisource: "বাংলা উইকিসংকলন",
  bnwikivoyage: "বাংলা উইকিভ্রমণ",
  bnwiktionary: "বাংলা উইকিঅভিধান",
  bpywiki: "বিষ্ণুপ্রিয়া মণিপুরী উইকিপিডিয়া",
  commonswiki: "উইকিমিডিয়া কমন্স",
  datawiki: "উইকিউপাত্ত",
  wikidatawiki: "উইকিউপাত্ত",
  dewiki: "জার্মান উইকিপিডিয়া",
  enwiki: "ইংরেজি উইকিপিডিয়া",
  enwikibooks: "ইংরেজি উইকিবই",
  enwikinews: "ইংরেজি উইকিসংবাদ",
  enwikiquote: "ইংরেজি উইকিউক্তি",
  enwikisource: "ইংরেজি উইকিসংকলন",
  enwikiversity: "ইংরেজি উইকিভার্সিটি",
  enwikivoyage: "ইংরেজি উইকিভ্রমণ",
  foundationwiki: "উইকিমিডিয়া ফাউন্ডেশন",
  hiwiki: "হিন্দি উইকিপিডিয়া",
  hiwikiquote: "হিন্দি উইকিউক্তি",
  hiwikisource: "হিন্দি উইকিসংকলন",
  idwiki: "ইন্দোনেশীয় উইকিপিডিয়া",
  incubatorwiki: "উইকিমিডিয়া ইনকিউবেটর",
  itwiki: "ইতালীয় উইকিপিডিয়া",
  jawiki: "জাপানি উইকিপিডিয়া",
  knwiki: "কন্নড় উইকিপিডিয়া",
  kowiki: "কোরীয় উইকিপিডিয়া",
  lmowiki: "লম্বার্ড উইকিপিডিয়া",
  mediawikiwiki: "মিডিয়াউইকি",
  metawiki: "মেটা-উইকি",
  mlwiki: "মালয়ালম উইকিপিডিয়া",
  mrwiki: "মারাঠি উইকিপিডিয়া",
  newiki: "নেপালি উইকিপিডিয়া",
  ruwikisource: "রুশ উইকিসংকলন",
  sawiki: "সংস্কৃত উইকিপিডিয়া",
  sawikisource: "সংস্কৃত উইকিসংকলন",
  siwiki: "সিংহলি উইকিপিডিয়া",
  specieswiki: "উইকিস্পিসিজ",
  tawiki: "তামিল উইকিপিডিয়া",
  tawikisource: "তামিল উইকিসংকলন",
  tewiki: "তেলুগু উইকিপিডিয়া",
  thwiki: "থাই উইকিপিডিয়া",
  wikimaniawiki: "উইকিম্যানিয়া",
  zhwiki: "চীনা উইকিপিডিয়া",
  zhwiktionary: "চীনা উইকিঅভিধান",
};

function ContributionsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg shadow-md animate-pulse"
        >
          <div className="h-6 bg-gray-800 rounded w-3/4 mb-4" />
          <div className="h-10 bg-gray-800 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-800 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-800 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

async function ContributionsList() {
  const contributions = await getWikimediaContributions();

  if (contributions.length === 0) {
    return (
      <p className="text-center text-gray-300">
        অবদানের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributions.map((contrib) => (
        <div
          key={contrib.wiki}
          className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg shadow-md hover:border-amber-500 transition-colors"
        >
          <h3 className="text-xl font-semibold font-hind-siliguri mb-2 text-amber-500">
            {WIKI_NAMES[contrib.wiki] || contrib.wiki}
          </h3>
          <p className="text-4xl font-bold text-white mb-4">
            {contrib.editcount.toLocaleString("bn-BD")}
          </p>
          <p className="text-gray-300 mb-4">টি সম্পাদনা</p>
          <a
            href={`${contrib.url}/wiki/Special:Contributions/${encodeURIComponent(
              "জয়শ্রীরাম সরকার"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-amber-500 hover:underline inline-flex items-center"
            aria-label={`${WIKI_NAMES[contrib.wiki] || contrib.wiki}-এ অবদান দেখুন`}
          >
            অবদান দেখুন <ExternalLink className="ml-1 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ))}
    </div>
  );
}

export default function AllContributionsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <Button variant="ghost" className="mr-4 hover:bg-gray-800" asChild>
            <Link href="/" aria-label="ফিরে যান">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent font-hind-siliguri">
            আমার সমস্ত উইকিমিডিয়া অবদান
          </h1>
        </div>

        <Suspense fallback={<ContributionsSkeleton />}>
          <ContributionsList />
        </Suspense>
      </div>
    </main>
  );
}