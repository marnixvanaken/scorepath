import { NextRequest, NextResponse } from 'next/server';
import { markPosted } from '@/lib/tweets-queue';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const secret = process.env.CRON_SECRET;

  if (!body || !secret || body.key !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (typeof body.id !== 'string' || typeof body.posted !== 'boolean') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  try {
    const tweetUrl = typeof body.tweetUrl === 'string' ? body.tweetUrl : undefined;
    await markPosted(body.id, body.posted, tweetUrl);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
