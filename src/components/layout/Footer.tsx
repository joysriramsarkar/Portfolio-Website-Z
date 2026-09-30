import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  copyright: string;
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/joysriramsarkar', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/জয়শ্রীরাম-সরকার-abb282110/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/SarkarJoysriram', label: 'Twitter / X' },
  { icon: Facebook, href: 'https://www.facebook.com/joysriramsarkar0', label: 'Facebook' },
];

export default function Footer({ copyright }: FooterProps) {
  return (
    <footer className="py-10 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-5 mb-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all duration-200"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="text-slate-500 text-sm">{copyright}</p>
      </div>
    </footer>
  );
}
