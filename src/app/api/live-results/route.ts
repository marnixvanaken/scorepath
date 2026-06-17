import { NextResponse } from 'next/server';
import { mapFdResponse } from '@/lib/footballDataMapper';

const FD_URL = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';

export async function GET() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ results: [], hasActiveMatch: false });
  }

  let data: { matches?: unknown[] };
  try {
    const res = await fetch(FD_URL, {
      headers: { 'X-Auth-Token': apiKey },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return NextResponse.json({ results: [], hasActiveMatch: false });
    }

    data = await res.json();
  } catch {
    return NextResponse.json({ results: [], hasActiveMatch: false });
  }

  const mapped = mapFdResponse(data as Parameters<typeof mapFdResponse>[0]);
  return NextResponse.json(mapped);
}
