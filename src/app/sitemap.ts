import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteConfig';
import { getPublishedBlogs } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getPublishedBlogs();

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/wk-2026`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
