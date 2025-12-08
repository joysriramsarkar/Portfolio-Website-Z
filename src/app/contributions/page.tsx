import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  bnwiki: "বাংলা উইকিপিডিয়া",
  metawiki: "মেটা-উইকি",
  bnwikisource: "বাংলা উইকিসংকলন",
  commonswiki: "উইকিমিডিয়া কমন্স",
  datawiki: "উইকিউপাত্ত",
};

export default async function AllContributionsPage() {
  const contributions = await getWikimediaContributions();

  return (
    <main className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <Link href="/" passHref>
            <Button variant="ghost" className="mr-4 hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent font-hind-siliguri">
            আমার সমস্ত উইকিমিডিয়া অবদান
          </h1>
        </div>

        {contributions.length > 0 ? (
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
                <p className="text-gray-400 mb-4">টি সম্পাদনা</p>
                <a
                  href={`${contrib.url}/wiki/Special:Contributions/${encodeURIComponent(
                    "জয়শ্রীরাম সরকার"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-500 hover:underline inline-flex items-center"
                >
                  অবদান দেখুন <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            অবদানের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
}