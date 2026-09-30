import Link from 'next/link';
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';

interface SiteFooterProps {
  language: 'bn' | 'en';
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/joysriramsarkar', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/জয়শ্রীরাম-সরকার-abb282110/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/SarkarJoysriram', label: 'Twitter / X' },
  { icon: Facebook, href: 'https://www.facebook.com/joysriramsarkar0', label: 'Facebook' },
];

const footerLinks = [
  { href: '/projects', labelEn: 'Projects', labelBn: 'প্রজেক্ট' },
  { href: '/lab', labelEn: 'Lab', labelBn: 'ল্যাব' },
  { href: '/about', labelEn: 'About', labelBn: 'আমার সম্পর্কে' },
  { href: '/writing', labelEn: 'Writing', labelBn: 'লেখা' },
  { href: '/open-source', labelEn: 'Open Source', labelBn: 'ওপেন সোর্স' },
  { href: '/now', labelEn: 'Now', labelBn: 'এখন' },
];

export default function SiteFooter({ language }: SiteFooterProps) {
  const isBn = language === 'bn';

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] mt-auto">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-semibold text-[var(--text)] hover:text-[var(--accent-bengali)] transition-colors text-sm"
            >
              {isBn ? 'জয়শ্রীরাম সরকার' : 'Joysriram Sarkar'}
            </Link>
            <p className="text-[var(--text-faint)] text-xs mt-1 leading-relaxed max-w-[240px]">
              {isBn
                ? 'AI-সহায়ক builder · বাংলা-প্রথম প্রযুক্তি · ওপেন সোর্স'
                : 'AI-assisted builder · Bengali-first tech · Open source'}
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--text-faint)] hover:text-[var(--accent-bengali)] transition-colors"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map(({ href, labelEn, labelBn }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[var(--text-muted)] hover:text-[var(--text)] text-sm transition-colors"
                  >
                    {isBn ? labelBn : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between gap-2">
          <p className="section-label">
            {isBn
              ? '© ২০২৬ জয়শ্রীরাম সরকার। সর্বস্বত্ব সংরক্ষিত।'
              : '© 2026 Joysriram Sarkar. All rights reserved.'}
          </p>
          <p className="section-label">
            {isBn ? 'শিলিগুড়ি, পশ্চিমবঙ্গ, ভারত' : 'Siliguri, West Bengal, India'}
          </p>
        </div>
      </div>
    </footer>
  );
}
