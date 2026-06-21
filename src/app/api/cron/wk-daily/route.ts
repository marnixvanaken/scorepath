import { NextRequest, NextResponse } from 'next/server';
import { mapFdResponse } from '@/lib/footballDataMapper';
import { enqueueTweets, type NewTweet } from '@/lib/tweets-queue';
import {
  matchDayRecapEn,
  matchDayRecapNl,
  birthplaceSpotlightEn,
  birthplaceSpotlightNl,
  type MatchDay,
} from '@/lib/tweet-templates';

export const runtime = 'nodejs';
export const maxDuration = 30;

const FD_URL = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';

function today(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); // YYYY-MM-DD
}

async function fetchTodaysMatches(): Promise<MatchDay[]> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return [];
  try {
    const res = await fetch(FD_URL, { headers: { 'X-Auth-Token': apiKey } });
    if (!res.ok) return [];
    const data: { matches?: unknown[] } = await res.json();
    const mapped = mapFdResponse(data as Parameters<typeof mapFdResponse>[0]);
    return mapped.results.filter(
      (r): r is typeof r & { homeGoals: number; awayGoals: number } =>
        r.locked && typeof r.homeGoals === 'number' && typeof r.awayGoals === 'number'
    );
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ?force=1 regenereert (overschrijft) de content voor vandaag
  const force = new URL(req.url).searchParams.get('force') === '1';

  const day = today();
  const matches = await fetchTodaysMatches();
  const tweets: NewTweet[] = [];

  const add = (
    account: 'laasteman' | 'scorepath',
    handle: string,
    lang: 'nl' | 'en',
    type: string,
    text: string
  ) => {
    tweets.push({
      account, handle, lang, type, text,
      scheduled_for: day,
      dedupe_key: `${account}:${type}:${day}`,
    });
  };

  // @ScorepathEN (EN) — hoofdaccount, eerst
  add('scorepath', '@ScorepathEN', 'en', 'birthplace', birthplaceSpotlightEn());
  if (matches.length > 0) {
    add('scorepath', '@ScorepathEN', 'en', 'recap', matchDayRecapEn(matches));
  }

  // @LaatsteMan1998 (NL)
  add('laasteman', '@LaatsteMan1998', 'nl', 'birthplace', birthplaceSpotlightNl());
  if (matches.length > 0) {
    add('laasteman', '@LaatsteMan1998', 'nl', 'recap', matchDayRecapNl(matches));
  }

  try {
    const inserted = await enqueueTweets(tweets, force);
    return NextResponse.json({
      day,
      force,
      generated: tweets.length,
      inserted,
      skippedDuplicates: tweets.length - inserted,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
