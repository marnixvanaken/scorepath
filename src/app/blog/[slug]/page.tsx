import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Logo } from '@/components/Logo';
import { getBlogBySlug, getPublishedBlogs } from '@/data/blogs';
import { getDynamicBlogBySlug } from '@/lib/supabase';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { DrieLegendesContent } from './drie-legendes';
import { VsIranContent } from './vs-iran';
import { MbappeKloseContent } from './mbappe-klose';
import { MessiWedstrijdenContent } from './messi-wedstrijden';
import { YamalDubbelContent } from './yamal-dubbel';
import { OudsteCoachContent } from './oudste-coach';
import { CourtoisCleanSheetsContent } from './courtois-clean-sheets';
import { MessiRivelinoContent } from './messi-rivelino';
import { TimPayneContent } from './tim-payne';

export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const dynamic = await getDynamicBlogBySlug(slug).catch(() => null);
  const post = dynamic ?? getBlogBySlug(slug);
  if (!post) return {};
  const tags = 'tags' in post ? post.tags : [];
  const author = 'author' in post ? post.author : SITE_NAME;
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: author, url: SITE_URL }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [author],
      tags,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'nl_NL',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

function StaticBlogContent({ slug }: { slug: string }) {
  switch (slug) {
    case 'drie-legendes-wk-2026':        return <DrieLegendesContent />;
    case 'vs-iran-wk-2026':              return <VsIranContent />;
    case 'mbappe-jaagt-klose':           return <MbappeKloseContent />;
    case 'messi-meeste-wk-wedstrijden':  return <MessiWedstrijdenContent />;
    case 'yamal-euro-wk-dubbel':         return <YamalDubbelContent />;
    case 'oudste-coach-wk-2026':         return <OudsteCoachContent />;
    case 'courtois-clean-sheets':        return <CourtoisCleanSheetsContent />;
    case 'messi-vrije-trappen-rivelino': return <MessiRivelinoContent />;
    case 'tim-payne-viral-wk':           return <TimPayneContent />;
    default:                             return null;
  }
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const dynamicPost = await getDynamicBlogBySlug(slug).catch(() => null);
  const staticPost = getBlogBySlug(slug);

  if (!dynamicPost && (!staticPost || !staticPost.published)) notFound();

  const post = dynamicPost ?? staticPost!;
  const tags = 'tags' in post ? post.tags : (staticPost?.tags ?? []);
  const readTime = 'read_time' in post ? post.read_time : (staticPost?.readTime ?? 5);
  const related = staticPost && 'related' in staticPost ? (staticPost as { related?: string[] }).related ?? [] : [];
  const author = 'author' in post ? post.author : (staticPost?.author ?? SITE_NAME);
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'nl',
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
    keywords: tags.join(', '),
    isPartOf: { '@type': 'Blog', name: `${SITE_NAME} Blog`, url: `${SITE_URL}/blog` },
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
              href="/blog"
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-wide uppercase"
            >
              Blog
            </Link>
            <Link
              href="/wk-2026"
              className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors tracking-wide uppercase"
            >
              Open simulator
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">

          <div className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-8 group"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Terug naar blog
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-[11px] text-slate-600">{readTime} min lezen</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {post.description}
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
                  Gepubliceerd op{' '}
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
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
              <StaticBlogContent slug={slug} />
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-[#141414] flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Alle artikelen
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
                  Misschien vind je deze ook leuk
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group block bg-[#0d0d0d] border border-[#1a1a1a] hover:border-orange-500/30 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      <div className="p-5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                          {rel.category}
                        </span>
                        <h3 className="font-bold text-white text-sm leading-snug mt-3 mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                          {rel.title}
                        </h3>
                        <span className="text-xs font-bold text-orange-500 group-hover:text-orange-400 transition-colors inline-flex items-center gap-1">
                          Lees artikel
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
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
            <span>WK 2026 · 48 teams · 12 groepen</span>
            <span>·</span>
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
