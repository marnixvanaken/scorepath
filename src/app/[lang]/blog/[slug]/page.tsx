import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Logo } from '@/components/Logo';
import { getBlogBySlug, getPublishedBlogs } from '@/data/blogs';
import { getLocalizedBlogMeta } from '@/data/blogTranslations';
import { getDynamicBlogBySlug } from '@/lib/supabase';
import { isLocale, DEFAULT_LOCALE, getMessages, getDateLocale, LOCALES } from '@/i18n';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { alternatesFor, ogLocaleFields, ogImages, blogPath, localizedBlogSlug, resolveBlogSlug, simulatorPath } from '@/lib/routes';
import { DrieLegendesContent } from '@/app/blog/[slug]/drie-legendes';
import { VsIranContent } from '@/app/blog/[slug]/vs-iran';
import { MbappeKloseContent } from '@/app/blog/[slug]/mbappe-klose';
import { MessiWedstrijdenContent } from '@/app/blog/[slug]/messi-wedstrijden';
import { YamalDubbelContent } from '@/app/blog/[slug]/yamal-dubbel';
import { OudsteCoachContent } from '@/app/blog/[slug]/oudste-coach';
import { CourtoisCleanSheetsContent } from '@/app/blog/[slug]/courtois-clean-sheets';
import { MessiRivelinoContent } from '@/app/blog/[slug]/messi-rivelino';
import { TimPayneContent } from '@/app/blog/[slug]/tim-payne';

export const revalidate = 3600;

export function generateStaticParams() {
  const slugs = getPublishedBlogs().map((post) => post.slug);
  // Per taal de GELOKALISEERDE slug pregenereren (en bv. world-cup, es mundial).
  return LOCALES.flatMap((lang) =>
    slugs.map((canonical) => ({ lang, slug: localizedBlogSlug(canonical, lang) })),
  );
}

export async function generateMetadata(
  props: PageProps<'/[lang]/blog/[slug]'>
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const canonical = resolveBlogSlug(locale, slug);
  const dynamic = await getDynamicBlogBySlug(canonical).catch(() => null);
  const staticPost = getBlogBySlug(canonical);
  if (!dynamic && !staticPost) return {};

  const basePost = dynamic ?? staticPost!;
  const localized = getLocalizedBlogMeta(canonical, locale);
  const title = localized?.title ?? basePost.title;
  const description = localized?.description ?? basePost.description;
  const author = 'author' in basePost ? basePost.author : SITE_NAME;
  const tags = 'tags' in basePost ? basePost.tags : [];
  const alternates = alternatesFor((l) => blogPath(l, canonical), locale);

  return {
    title,
    description,
    authors: [{ name: author, url: SITE_URL }],
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: basePost.date,
      authors: [author],
      tags,
      url: alternates.canonical,
      siteName: SITE_NAME,
      ...ogLocaleFields(locale),
      images: ogImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages(locale).map((i) => i.url),
    },
  };
}

function StaticBlogContent({ slug, lang }: { slug: string; lang: string }) {
  switch (slug) {
    case 'drie-legendes-wk-2026':        return <DrieLegendesContent lang={lang} />;
    case 'vs-iran-wk-2026':              return <VsIranContent lang={lang} />;
    case 'mbappe-jaagt-klose':           return <MbappeKloseContent lang={lang} />;
    case 'messi-meeste-wk-wedstrijden':  return <MessiWedstrijdenContent lang={lang} />;
    case 'yamal-euro-wk-dubbel':         return <YamalDubbelContent lang={lang} />;
    case 'oudste-coach-wk-2026':         return <OudsteCoachContent lang={lang} />;
    case 'courtois-clean-sheets':        return <CourtoisCleanSheetsContent lang={lang} />;
    case 'messi-vrije-trappen-rivelino': return <MessiRivelinoContent lang={lang} />;
    case 'tim-payne-viral-wk':           return <TimPayneContent lang={lang} />;
    default:                             return null;
  }
}

export default async function BlogPostPage(props: PageProps<'/[lang]/blog/[slug]'>) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const msg = getMessages(lang);
  const dateLocale = getDateLocale(lang);
  const canonical = resolveBlogSlug(lang, slug);

  const dynamicPost = await getDynamicBlogBySlug(canonical).catch(() => null);
  const staticPost = getBlogBySlug(canonical);

  if (!dynamicPost && (!staticPost || !staticPost.published)) notFound();

  const post = dynamicPost ?? staticPost!;
  const localized = getLocalizedBlogMeta(canonical, lang);
  const displayTitle = localized?.title ?? post.title;
  const displayDescription = localized?.description ?? post.description;
  const displayCategory = localized?.category ?? post.category;
  const tags = 'tags' in post ? post.tags : (staticPost?.tags ?? []);
  const readTime = 'read_time' in post ? post.read_time : (staticPost?.readTime ?? 5);
  const related = staticPost && 'related' in staticPost ? (staticPost as { related?: string[] }).related ?? [] : [];
  const author = 'author' in post ? post.author : (staticPost?.author ?? SITE_NAME);
  const canonicalUrl = `${SITE_URL}${blogPath(lang, canonical)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: displayTitle,
    description: displayDescription,
    image: [`${SITE_URL}/${lang}/opengraph-image`],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
    keywords: tags.join(', '),
    isPartOf: { '@type': 'Blog', name: `${SITE_NAME} Blog`, url: `${SITE_URL}/${lang}/blog` },
  };

  return (
    <div className="min-h-dvh bg-panel text-slate-100 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <nav className="px-6 py-4 border-b border-[#141414]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/blog`}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-wide uppercase"
            >
              {msg.nav.blog}
            </Link>
            <Link
              href={simulatorPath(lang)}
              className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors tracking-wide uppercase"
            >
              {msg.blog.openSimulator}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">

          <div className="mb-10">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-8 group"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {msg.blog.back}
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                {displayCategory}
              </span>
              <span className="text-[11px] text-slate-600">{readTime} {msg.blog.readTime}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-5">
              {displayTitle}
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {displayDescription}
            </p>

            <div className="flex items-center gap-3 pt-5 border-t border-[#1a1a1a]">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-300">{author}</p>
                <p className="text-[11px] text-slate-600">
                  {msg.blog.publishedOn}{' '}
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#141414] pt-10">
            {dynamicPost ? (
              <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-strong:text-white">
                <ReactMarkdown>{dynamicPost.content}</ReactMarkdown>
              </div>
            ) : (
              <StaticBlogContent slug={canonical} lang={lang} />
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-[#141414] flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {msg.blog.allArticles}
            </Link>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#111] border border-[#222] text-slate-500 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {related.length > 0 && (() => {
            const relatedPosts = related.map(getBlogBySlug).filter(Boolean) as NonNullable<ReturnType<typeof getBlogBySlug>>[];
            return relatedPosts.length > 0 ? (
              <div className="mt-14">
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-5">
                  {msg.blog.youMightAlsoLike}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rel) => {
                    const relLocalized = getLocalizedBlogMeta(rel.slug, lang);
                    return (
                      <Link
                        key={rel.slug}
                        href={blogPath(lang, rel.slug)}
                        className="group block bg-[#0d0d0d] border border-[#1a1a1a] hover:border-orange-500/30 rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <div className="p-5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                            {relLocalized?.category ?? rel.category}
                          </span>
                          <h3 className="font-bold text-white text-sm leading-snug mt-3 mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                            {relLocalized?.title ?? rel.title}
                          </h3>
                          <span className="text-xs font-bold text-orange-500 group-hover:text-orange-400 transition-colors inline-flex items-center gap-1">
                            {msg.blog.readArticle}
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })()}
        </div>
      </main>

      <footer className="border-t border-[#141414] px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3 text-[11px] text-slate-700">
            <span>{msg.blog.footerText}</span>
            <span>·</span>
            <Link href={`/${lang}/about`} className="hover:opacity-70 transition-opacity">{msg.nav.about}</Link>
            <span>·</span>
            <Link href={`/${lang}/privacy`} className="hover:opacity-70 transition-opacity">{msg.nav.privacy}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
