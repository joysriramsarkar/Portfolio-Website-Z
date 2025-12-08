"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface GithubProjectsProps {
  language: "bn" | "en";
  translations: any;
}

async function getGithubProjects(): Promise<Repo[]> {
  const username = "joysriramsarkar";
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub projects");
    }

    const data: Repo[] = await response.json();
    return data;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return [];
  }
}

export default function GithubProjects({ language, translations }: GithubProjectsProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const t = translations[language];

  useEffect(() => {
    async function fetchData() {
      const data = await getGithubProjects();
      setRepos(data);
    }
    fetchData();
  }, []);

  if (repos.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
          {t.githubProjects}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block bg-card p-6 rounded-lg shadow-md border border-border hover:border-amber-500 transition-all duration-300 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-amber-500 mb-2">{repo.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{repo.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> {repo.forks_count}</span>
                  </div>
                  {repo.language && <span className="text-xs font-mono">{repo.language}</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}