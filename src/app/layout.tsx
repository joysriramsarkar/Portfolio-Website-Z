import type { Metadata } from "next";
import { Hind_Siliguri, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

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
  openGraph: {
    title: "Joysriram Sarkar — AI-assisted Builder & Bengali Technologist",
    description:
      "Digital workshop of Joysriram Sarkar — exploring Bengali computing, open-source software, and AI-assisted engineering.",
    url: "https://joysriram.com",
    siteName: "Joysriram Sarkar",
    type: "website",
    locale: "bn_BD",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
