import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Coming Soon | Joysriram Sarkar',
  description:
    'জয়শ্রীরামের ব্লগ শীঘ্রই আসছে। Web Development, Python, Bengali Computing এবং Open Source নিয়ে লেখা।',
  robots: { index: false, follow: false }, // Content না থাকলে index করার দরকার নেই
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-cyan-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>

        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
          শীঘ্রই আসছে
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">ব্লগ</h1>

        <p className="text-slate-400 text-lg leading-relaxed mb-4">
          এখানে Web Development, Python, Bengali Computing এবং Open Source নিয়ে লেখা আসবে।
        </p>
        <p className="text-slate-500 text-base mb-10">
          Blog is coming soon. Stay tuned.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors"
          >
            ← হোমে ফিরে যান
          </Link>
          <a
            href="https://github.com/joysriramsarkar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold transition-colors"
          >
            GitHub দেখুন
          </a>
        </div>
      </div>
    </main>
  );
}
