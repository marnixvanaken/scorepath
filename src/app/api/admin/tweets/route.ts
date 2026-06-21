import { NextRequest, NextResponse } from 'next/server';
import { markPosted, addCustomTweet } from '@/lib/tweets-queue';

export const runtime = 'nodejs';

const HANDLES: Record<string, string> = {
  scorepath: '@ScorepathEN',
  laasteman: '@LaatsteMan1998',
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const secret = process.env.CRON_SECRET;

  if (!body || !secret || body.key !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Eigen/topical tweet toevoegen
  if (body.action === 'add') {
    const account = body.account === 'scorepath' ? 'scorepath' : 'laasteman';
    const lang = account === 'scorepath' ? 'en' : 'nl';
    if (typeof body.text !== 'string' || body.text.trim().length === 0) {
      return NextResponse.json({ error: 'Tekst ontbreekt' }, { status: 400 });
    }
    try {
      await addCustomTweet({
        account,
        handle: HANDLES[account],
        lang,
        text: body.text.trim(),
        scheduled_for: new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }),
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : String(err) },
        { status: 500 }
      );
    }
  }

  // Markeer als (on)geplaatst
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
