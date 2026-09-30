'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface GithubProjectsProps {
  language: 'bn' | 'en';
  translations: Record<string, { githubProjects: string; viewOnGithub: string }>;
}

// Curated list — GitHub API-এর sort=pushed এর বদলে নির্দিষ্ট repo দেখানো হচ্ছে
// এটা portfolio-র জন্য সবচেয়ে ভালো কারণ তুমি decide করছ কোন project গুরুত্বপূর্ণ
const FEATURED_REPOS = [
  'banglagan',
  'banglagan_android_app',
  'my-portfolio',
  'nilLang',
] as const;

const USERNAME = 'joysriramsarkar';

async function fetchFeaturedRepos(): Promise<Repo[]> {
  const results = await Promise.allSettled(
    FEATURED_REPOS.map((repo) =>
      fetch(`https://api.github.com/repos/${USERNAME}/${repo}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // User-Agent header সঠিক site URL দিয়ে
          'User-Agent': `${USERNAME}-portfolio/1.0 (https://joysriram.com)`,
        },
        next: { revalidate: 3600 }, // 1 ঘণ্টা cache
      }).then((r) => r.json() as Promise<Repo>)
    )
  );

  return results
    .filter((r): r is PromiseFulfilledResult<Repo> => r.status === 'fulfilled' && !!r.value?.id)
    .map((r) => r.value);
}

// Language badge রঙ — design language maintain করা (cyan/blue)
const LANG_COLORS: Record<string, string> = {
  TypeScript: 'text-cyan-400',
  JavaScript: 'text-cyan-300',
  Python: 'text-blue-400',
  default: 'text-slate-400',
};

export default function GithubProjects({ language, translations }: GithubProjectsProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    fetchFeaturedRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []); // language dependency সরানো হয়েছে — GitHub data ভাষা অনুযায়ী বদলায় না

  if (loading) return null;
  if (repos.length === 0) return null;

  return (
    <section className="py-16 bg-slate-900/30" aria-label="GitHub Projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-wide text-sm flex items-center justify-center gap-2">
            <Github className="w-4 h-4" aria-hidden="true" />
            GitHub
          </p>
          {/* Design language unified: cyan/blue gradient (amber/yellow সরানো হয়েছে) */}
          <h2 className="text-3xl md:text-4xl font-bold bg-[linear-gradient(to_right,theme(colors.cyan.400),theme(colors.blue.600))] bg-clip-text text-transparent">
            {t.githubProjects}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group block bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 h-full"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {repo.name}
                  </h3>
                  <ExternalLink
                    className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 transition-colors shrink-0 ml-2"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-slate-400 text-sm mb-4 flex-grow leading-relaxed">
                  {repo.description ?? (language === 'bn' ? 'বিবরণ নেই' : 'No description')}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                  {repo.language && (
                    <span
                      className={`text-xs font-mono ${LANG_COLORS[repo.language] ?? LANG_COLORS.default}`}
                    >
                      {repo.language}
                    </span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            {language === 'bn' ? 'সব প্রজেক্ট দেখুন' : 'View all projects on GitHub'}
          </a>
        </div>
      </div>
    </section>
  );
}