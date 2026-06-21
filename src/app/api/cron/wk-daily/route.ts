import { NextRequest, NextResponse } from 'next/server';
import { mapFdResponse } from '@/lib/footballDataMapper';
import { postTweet } from '@/lib/twitter';
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

function todayLabelEn(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam',
  });
}

function todayLabelNl(): string {
  return new Date().toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam',
  });
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

  const posted: string[] = [];
  const skipped: string[] = [];

  const matches = await fetchTodaysMatches();

  // ── @LaatsteMan1998 (Dutch) ──────────────────────────────────────────────
  try {
    const id = await postTweet(birthplaceSpotlightNl(), 'laasteman');
    posted.push(`laasteman:birthplace:${id}`);
  } catch (err) {
    skipped.push(`laasteman:birthplace: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (matches.length > 0) {
    try {
      const id = await postTweet(matchDayRecapNl(matches, todayLabelNl()), 'laasteman');
      posted.push(`laasteman:recap:${id}`);
    } catch (err) {
      skipped.push(`laasteman:recap: ${err instanceof Error ? err.message : String(err)}`);
    }
  } else {
    skipped.push('laasteman:recap: geen wedstrijden vandaag');
  }

  // ── @ScorepathEN (English) — activeer zodra AccessToken_Scorepath in Vercel staat ──
  if (process.env.AccessToken_Scorepath) {
    try {
      const id = await postTweet(birthplaceSpotlightEn(), 'scorepath');
      posted.push(`scorepath:birthplace:${id}`);
    } catch (err) {
      skipped.push(`scorepath:birthplace: ${err instanceof Error ? err.message : String(err)}`);
    }

    if (matches.length > 0) {
      try {
        const id = await postTweet(matchDayRecapEn(matches, todayLabelEn()), 'scorepath');
        posted.push(`scorepath:recap:${id}`);
      } catch (err) {
        skipped.push(`scorepath:recap: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else {
      skipped.push('scorepath:recap: no matches today');
    }
  } else {
    skipped.push('scorepath: credentials not configured');
  }

  return NextResponse.json({ posted, skipped });
}
