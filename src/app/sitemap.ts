import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteConfig';
import { getPublishedBlogs } from '@/data/blogs';
import { LOCALES, type Locale } from '@/i18n';
import { HREFLANG, simulatorPath, birthplacePath, blogPath } from '@/lib/routes';

// Bouwt voor één logische pagina een sitemap-entry per taal, elk met de
// volledige hreflang-set (incl. x-default -> en).
function localizedEntries(
  pathFor: (l: Locale) => string,
  opts: { lastModified?: Date; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE_URL}${pathFor(l)}`;
  languages['x-default'] = `${SITE_URL}${pathFor('en')}`;

  return LOCALES.map((l) => ({
    url: `${SITE_URL}${pathFor(l)}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getPublishedBlogs();

  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries((l) => `/${l}`, { changeFrequency: 'weekly', priority: 1.0 }),
    ...localizedEntries(simulatorPath, { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries(birthplacePath, { changeFrequency: 'monthly', priority: 0.7 }),
    ...localizedEntries((l) => `/${l}/blog`, { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries((l) => `/${l}/about`, { changeFrequency: 'yearly', priority: 0.4 }),
    ...localizedEntries((l) => `/${l}/privacy`, { changeFrequency: 'yearly', priority: 0.3 }),
  ];

  const blogUrls: MetadataRoute.Sitemap = blogs.flatMap((blog) =>
    localizedEntries((l) => blogPath(l, blog.slug), {
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  return [...staticPages, ...blogUrls];
}
