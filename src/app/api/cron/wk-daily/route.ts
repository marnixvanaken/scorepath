import { NextRequest, NextResponse } from 'next/server';
import { mapFdResponse } from '@/lib/footballDataMapper';
import { postTweet } from '@/lib/twitter';
import { matchDayRecap, birthplaceCitySpotlight } from '@/lib/tweet-templates';

export const runtime = 'nodejs';
export const maxDuration = 30;

const FD_URL = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';

function todayLabel(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Amsterdam',
  });
}

function isToday(dateStr: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const matchDate = new Date(dateStr).toISOString().slice(0, 10);
  return today === matchDate;
}

async function fetchTodaysMatches() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return [];

  let data: { matches?: unknown[] };
  try {
    const res = await fetch(FD_URL, { headers: { 'X-Auth-Token': apiKey } });
    if (!res.ok) return [];
    data = await res.json();
  } catch {
    return [];
  }

  const mapped = mapFdResponse(data as Parameters<typeof mapFdResponse>[0]);
  return mapped.results.filter(
    (r): r is typeof r & { homeGoals: number; awayGoals: number } =>
      r.locked && typeof r.homeGoals === 'number' && typeof r.awayGoals === 'number'
  );
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posted: string[] = [];
  const skipped: string[] = [];

  // 1. Birthplace spotlight — posts every day
  try {
    const text = birthplaceCitySpotlight();
    const id = await postTweet(text);
    posted.push(`birthplace:${id}`);
  } catch (err) {
    skipped.push(`birthplace: ${err instanceof Error ? err.message : String(err)}`);
  }

  // 2. Match day recap — only when matches finished today
  try {
    const matches = await fetchTodaysMatches();
    if (matches.length > 0) {
      const text = matchDayRecap(matches, todayLabel());
      const id = await postTweet(text);
      posted.push(`recap:${id}`);
    } else {
      skipped.push('recap: no finished matches today');
    }
  } catch (err) {
    skipped.push(`recap: ${err instanceof Error ? err.message : String(err)}`);
  }

  return NextResponse.json({ posted, skipped });
}
