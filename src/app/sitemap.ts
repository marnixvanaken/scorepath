import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteConfig';
import { getPublishedBlogs } from '@/data/blogs';
import { LOCALES } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getPublishedBlogs();

  const staticPages = LOCALES.flatMap((lang) => [
    {
      url: `${SITE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/${lang}/wk-2026`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${lang}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]);

  const blogUrls: MetadataRoute.Sitemap = LOCALES.flatMap((lang) =>
    blogs.map((blog) => ({
      url: `${SITE_URL}/${lang}/blog/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...blogUrls];
}
