import { NextRequest, NextResponse } from 'next/server';
import { postTweet, type XAccount } from '@/lib/twitter';
import { bestThirdsAnnouncementNl, bestThirdsAnnouncementEn } from '@/lib/tweet-templates';

export const runtime = 'nodejs';
export const maxDuration = 30;

// Handmatige test-endpoint om te checken of posten werkt zonder op de cron te wachten.
//   ?dry=1  → toont alleen de tekst, post niet
//   ?account=laasteman|scorepath  (default: laasteman)
//   ?lang=nl|en  (default: nl)
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const dry = searchParams.get('dry') === '1';
  const account = (searchParams.get('account') === 'scorepath' ? 'scorepath' : 'laasteman') as XAccount;
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'nl';

  const text = lang === 'en' ? bestThirdsAnnouncementEn() : bestThirdsAnnouncementNl();

  if (dry) {
    return NextResponse.json({ dry: true, account, lang, text });
  }

  try {
    const id = await postTweet(text, account);
    return NextResponse.json({ posted: true, account, lang, id, text });
  } catch (err) {
    return NextResponse.json(
      { posted: false, account, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
