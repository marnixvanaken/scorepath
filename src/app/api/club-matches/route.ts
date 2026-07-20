import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClub } from '@/data/clubs';
import { mapFdTeamMatches } from '@/lib/footballDataMapper';

// Aankomende wedstrijden voor één club uit de globe-dataset. Neemt bewust
// een club-id (geen fd-id) zodat dit geen open proxy naar football-data.org is.
const EMPTY = { matches: [] };

export async function GET(req: NextRequest) {
  const clubId = req.nextUrl.searchParams.get('club') ?? '';
  const club = getClub(clubId);
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!club || club.fdId === null || !apiKey) {
    return NextResponse.json(EMPTY);
  }

  try {
    const res = await fetch(
      `https://api.football-data.org/v4/teams/${club.fdId}/matches?status=SCHEDULED&limit=10`,
      {
        headers: { 'X-Auth-Token': apiKey },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return NextResponse.json(EMPTY);
    const data = (await res.json()) as Parameters<typeof mapFdTeamMatches>[0];
    return NextResponse.json(mapFdTeamMatches(data, club.fdId));
  } catch {
    return NextResponse.json(EMPTY);
  }
}
