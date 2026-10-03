import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { articles } from '@/data/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://joysriram.com';
  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p.featured ? 0.9 : 0.7,
  }));

  const writingEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/writing/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/lab`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/now`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/writing`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/open-source`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/designs`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contributions`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ];

  return [...staticRoutes, ...projectEntries, ...writingEntries];
}
