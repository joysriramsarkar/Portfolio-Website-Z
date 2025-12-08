import type { Metadata } from "next";
import { Hind_Siliguri, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Joysriram Sarkar - Digital Solutions & Web Development",
  description:
    "Professional web developer and AI content creator from Siliguri. Specializing in digital solutions, web development, and AI-powered content creation.",
  keywords: [
    "Joysriram",
    "Web Development",
    "AI Content",
    "Digital Solutions",
    "Siliguri",
    "CoderDive",
    "WordPress",
    "Python",
    "Freelancing",
    "জয়শ্রীরাম",
    "ওয়েব ডেভেলপমেন্ট",
    "এআই কন্টেন্ট",
    "ডিজিটাল সলিউশন",
    "শিলিগুড়ি",
    "কোডারডাইভ",
    "ওয়ার্ডপ্রেস",
    "পাইথন",
    "ফ্রিল্যান্সিং",
  ],
  authors: [{ name: "Joysriram Sarkar" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Joysriram Sarkar - Digital Solutions & Web Development",
    description:
      "Passionate Web Developer and AI Content Creator from Siliguri. ডিজিটাল সলিউশন ও ওয়েব ডেভেলপমেন্ট।",
    url: "https://joysriram.com",
    siteName: "Joysriram Sarkar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joysriram Sarkar - Web Developer",
    description:
      "Digital Solutions & Web Development | AI Content Creator | ডিজিটাল সলিউশন ও ওয়েব ডেভেলপমেন্ট",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${hindSiliguri.variable} ${poppins.variable}`}>
      <body
        className="antialiased bg-background text-foreground font-sans"
        data-gramm="false"
        data-gramm_editor="false"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
