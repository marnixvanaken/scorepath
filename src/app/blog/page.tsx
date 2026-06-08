import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { getPublishedBlogs } from '@/data/blogs';
import { getDynamicBlogs } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Analyses, statistieken en verhalen over het WK 2026.',
};

export const revalidate = 3600; // Cache 1 uur, dan fresh fetch

export default async function BlogPage() {
  const [staticPosts, dynamicPosts] = await Promise.all([
    Promise.resolve(getPublishedBlogs()),
    getDynamicBlogs().catch(() => []),
  ]);

  // Dynamische posts eerst (nieuwste bovenaan), dan statische
  const dynamicSlugs = new Set(dynamicPosts.map((p) => p.slug));
  const combined = [
    ...dynamicPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      readTime: p.read_time,
      category: p.category,
    })),
    ...staticPosts
      .filter((p) => !dynamicSlugs.has(p.slug))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        readTime: p.readTime,
        category: p.category,
      })),
  ];

  const posts = combined;

  return (
    <div className="min-h-dvh bg-panel text-slate-100 flex flex-col">

      <nav className="px-6 py-4 border-b border-[#141414]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-xs font-bold text-white tracking-wide uppercase"
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

      <main className="flex-1">
        <section className="px-6 pt-16 pb-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">
              ScorePath Blog
            </p>
            <h1 className="font-display text-5xl sm:text-6xl text-white mb-4">
              Blog
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Analyses, statistieken en verhalen over het WK 2026.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-[#0d0d0d] border border-[#1a1a1a] hover:border-orange-500/30 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-600">
                        {post.readTime} min lezen
                      </span>
                    </div>

                    <h2 className="font-bold text-white text-xl leading-snug mb-3 group-hover:text-orange-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">
                        {new Date(post.date).toLocaleDateString('nl-NL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="text-xs font-bold text-orange-500 group-hover:text-orange-400 transition-colors flex items-center gap-1">
                        Lees artikel
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#141414] px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <span>WK 2026 · 48 teams · 12 groepen</span>
            <span>·</span>
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
