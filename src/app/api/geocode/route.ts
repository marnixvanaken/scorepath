import type { NextRequest } from 'next/server';

interface GeocodeSuggestion {
  name: string;
  lat: number;
  lon: number;
}

const cache = new Map<string, GeocodeSuggestion[]>();

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) {
    return Response.json([]);
  }

  const lang = req.nextUrl.searchParams.get('lang') ?? 'en';
  const cacheKey = `${lang}:${q.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    return Response.json(cache.get(cacheKey));
  }

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5&lang=${lang}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ScorePath/1.0 (https://scorepath.nl)' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Photon ${res.status}`);

    const data = await res.json();
    const features = data?.features ?? [];

    const suggestions: GeocodeSuggestion[] = features
      .filter((f: unknown) => {
        const feat = f as { geometry?: { type?: string } };
        return feat.geometry?.type === 'Point';
      })
      .map((f: unknown) => {
        const feat = f as {
          geometry: { coordinates: [number, number] };
          properties: { name?: string; city?: string; state?: string; country?: string };
        };
        const [lon, lat] = feat.geometry.coordinates;
        const p = feat.properties;
        const parts = [p.name, p.city, p.state, p.country].filter(Boolean);
        const name = [...new Set(parts)].slice(0, 3).join(', ');
        return { name, lat, lon };
      });

    cache.set(cacheKey, suggestions);
    return Response.json(suggestions);
  } catch {
    return Response.json([], { status: 200 });
  }
}
