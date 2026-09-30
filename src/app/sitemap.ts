import { MetadataRoute } from 'next';

// Static project slugs — নতুন project যোগ হলে এখানে যোগ করুন
const PROJECT_SLUGS = ['project1', 'project2', 'project3'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://joysriram.com';
  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = PROJECT_SLUGS.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/designs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contributions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...projectEntries,
    // Blog: এখনও তৈরি নেই, তাই sitemap-এ নেই
    // /blog — ভবিষ্যতে যোগ হবে
  ];
}
