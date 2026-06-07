import { NextRequest, NextResponse } from 'next/server';
import { getViralTopics } from '@/lib/virality';
import { generateBlogPost, toBlogPostRecord } from '@/lib/blog-generator';
import { insertBlogPost } from '@/lib/supabase';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Beveilig de route: alleen aanroepbaar met CRON_SECRET
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Haal trending topics op
    const topics = await getViralTopics();
    if (topics.length === 0) {
      return NextResponse.json({ error: 'Geen viral topics gevonden' }, { status: 500 });
    }

    // 2. Genereer blogpost via Claude
    const generated = await generateBlogPost(topics);

    // 3. Sla op in Supabase
    const record = toBlogPostRecord(generated);
    await insertBlogPost(record);

    return NextResponse.json({
      success: true,
      slug: record.slug,
      title: record.title,
      topicsUsed: topics.length,
    });
  } catch (err) {
    console.error('Blog generatie mislukt:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Onbekende fout' },
      { status: 500 }
    );
  }
}

// Vercel Cron roept GET aan, POST voor handmatige test
export async function GET(req: NextRequest) {
  return POST(req);
}
