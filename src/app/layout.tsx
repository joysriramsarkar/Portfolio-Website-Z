import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "Joysriram Sarkar - Web Developer & AI Content Expert",
  description: "Joysriram Sarkar is a Freelance Web Developer and AI Content Writer specializing in Python, WordPress, and Ethical Hacking.",
  keywords: ["Joysriram Sarkar", "Web Developer", "AI Content Writer", "Freelancer", "Portfolio", "Python", "WordPress", "Ethical Hacking", "India"],
  authors: [{ name: "Joysriram Sarkar" }],
  openGraph: {
    title: "Joysriram Sarkar - Web Developer & AI Content Expert",
    description: "Personal portfolio of Joysriram Sarkar. Blending creativity with technology.",
    url: "https://joysriram.com",
    siteName: "Joysriram Sarkar Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joysriram Sarkar - Web Developer & AI Content Expert",
    description: "Personal portfolio of Joysriram Sarkar.",
    images: ["/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${hindSiliguri.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
