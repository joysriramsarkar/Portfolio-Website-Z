import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { articles } from '@/data/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://joysriram.com';
  const siteDate = new Date('2026-10-03');

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: siteDate,
    changeFrequency: 'monthly',
    priority: p.featured ? 0.9 : 0.7,
    alternates: {
      languages: {
        bn: `${baseUrl}/projects/${p.slug}?lang=bn`,
        en: `${baseUrl}/projects/${p.slug}?lang=en`,
      },
    },
  }));

  const writingEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/writing/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        bn: `${baseUrl}/writing/${a.slug}?lang=bn`,
        en: `${baseUrl}/writing/${a.slug}?lang=en`,
      },
    },
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: siteDate, changeFrequency: 'weekly', priority: 1.0, alternates: { languages: { bn: baseUrl, en: `${baseUrl}?lang=en` } } },
    { url: `${baseUrl}/projects`, lastModified: siteDate, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { bn: `${baseUrl}/projects`, en: `${baseUrl}/projects?lang=en` } } },
    { url: `${baseUrl}/lab`, lastModified: siteDate, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { bn: `${baseUrl}/lab`, en: `${baseUrl}/lab?lang=en` } } },
    { url: `${baseUrl}/now`, lastModified: siteDate, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { bn: `${baseUrl}/now`, en: `${baseUrl}/now?lang=en` } } },
    { url: `${baseUrl}/about`, lastModified: siteDate, changeFrequency: 'monthly', priority: 0.8, alternates: { languages: { bn: `${baseUrl}/about`, en: `${baseUrl}/about?lang=en` } } },
    { url: `${baseUrl}/writing`, lastModified: siteDate, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { bn: `${baseUrl}/writing`, en: `${baseUrl}/writing?lang=en` } } },
    { url: `${baseUrl}/open-source`, lastModified: siteDate, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { bn: `${baseUrl}/open-source`, en: `${baseUrl}/open-source?lang=en` } } },
    { url: `${baseUrl}/designs`, lastModified: siteDate, changeFrequency: 'monthly', priority: 0.6, alternates: { languages: { bn: `${baseUrl}/designs`, en: `${baseUrl}/designs?lang=en` } } },
    { url: `${baseUrl}/contributions`, lastModified: siteDate, changeFrequency: 'weekly', priority: 0.6, alternates: { languages: { bn: `${baseUrl}/contributions`, en: `${baseUrl}/contributions?lang=en` } } },
  ];

  return [...staticRoutes, ...projectEntries, ...writingEntries];
}
