import type { Metadata } from "next";
import { Hind_Siliguri, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joysriram.com"),
  title: {
    default: "Joysriram Sarkar — AI-assisted Builder & Bengali Technologist",
    template: "%s | Joysriram Sarkar",
  },
  description:
    "Personal engineering lab and digital portfolio of Joysriram Sarkar — AI-assisted builder, Bengali-first technologist, and open-source experimenter from Siliguri.",
  keywords: [
    "Joysriram Sarkar",
    "জয়শ্রীরাম সরকার",
    "AI-assisted builder",
    "Bengali Technologist",
    "Bangla Typing",
    "BanglaGan",
    "POS",
    "Chalao",
    "Nilang",
    "Onuron",
    "Open Source",
    "Wikimedia",
    "বাংলা কম্পিউটিং",
    "Siliguri",
  ],
  authors: [{ name: "Joysriram Sarkar", url: "https://joysriram.com" }],
  creator: "Joysriram Sarkar",
  alternates: {
    canonical: "https://joysriram.com",
    languages: {
      "bn": "https://joysriram.com",
      "en": "https://joysriram.com?lang=en",
    },
  },
  openGraph: {
    title: "Joysriram Sarkar — AI-assisted Builder & Bengali Technologist",
    description:
      "Digital workshop of Joysriram Sarkar — exploring Bengali computing, open-source software, and AI-assisted engineering.",
    url: "https://joysriram.com",
    siteName: "Joysriram Sarkar",
    type: "website",
    locale: "bn_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joysriram Sarkar — AI-assisted Builder & Bengali Technologist",
    description:
      "Digital workshop of Joysriram Sarkar — exploring Bengali computing, open-source software, and AI-assisted engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Joysriram Sarkar',
    alternateName: 'জয়শ্রীরাম সরকার',
    url: 'https://joysriram.com',
    sameAs: [
      'https://github.com/joysriramsarkar',
      'https://www.linkedin.com/in/joyshriramsarkar/',
      'https://x.com/SarkarJoysriram',
      'https://www.facebook.com/joysriramsarkar0',
    ],
    jobTitle: 'AI-assisted Builder & Bengali Technologist',
    knowsLanguage: ['bn', 'en'],
    homeLocation: {
      '@type': 'Place',
      name: 'শিলিগুড়ি, পশ্চিমবঙ্গ, ভারত',
    },
  };

  return (
    <html lang="bn" suppressHydrationWarning className={`${hindSiliguri.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent-bengali)] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-bengali)] focus:text-white focus:rounded focus:text-xs focus:font-mono"
        >
          Skip to content / মূল অংশে যান
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
