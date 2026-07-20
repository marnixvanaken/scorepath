import * as THREE from 'three';

// Stadsnaam-labels voor de globe: per unieke clubstad één canvas-gerenderde
// tekstsprite, zichtbaar bij inzoomen. Witte tekst met donkere outline leest
// op zowel de dag- als de nachttextuur, dus één stijl voor beide thema's.

export interface CityLabel {
  city: string;
  lat: number;
  lng: number;
  clubIds: string[];
}

export function buildCityLabels(
  clubs: { id: string; city: string; lat: number; lng: number }[],
): CityLabel[] {
  const byCity = new Map<string, { latSum: number; lngSum: number; clubIds: string[] }>();
  for (const club of clubs) {
    if (!club.city) continue;
    const entry = byCity.get(club.city) ?? { latSum: 0, lngSum: 0, clubIds: [] };
    entry.latSum += club.lat;
    entry.lngSum += club.lng;
    entry.clubIds.push(club.id);
    byCity.set(club.city, entry);
  }
  return [...byCity.entries()].map(([city, e]) => ({
    city,
    lat: e.latSum / e.clubIds.length,
    lng: e.lngSum / e.clubIds.length,
    clubIds: e.clubIds,
  }));
}

const FONT_PX = 44;
const PAD = 12;

interface LabelTexture {
  texture: THREE.Texture;
  aspect: number; // breedte/hoogte, voor de sprite-schaal
}

const cache = new Map<string, LabelTexture>();

export function getCityLabelTexture(city: string): LabelTexture {
  const cached = cache.get(city);
  if (cached) return cached;

  const font = `600 ${FONT_PX}px 'Barlow Condensed', 'Arial Narrow', sans-serif`;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = font;
  const textWidth = Math.ceil(measure.measureText(city).width);

  const canvas = document.createElement('canvas');
  canvas.width = textWidth + PAD * 2;
  canvas.height = FONT_PX + PAD * 2;
  const ctx = canvas.getContext('2d')!;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(10, 15, 25, 0.85)';
  ctx.lineWidth = 7;
  ctx.strokeText(city, canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
  ctx.fillText(city, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const entry = { texture, aspect: canvas.width / canvas.height };
  cache.set(city, entry);
  return entry;
}

export function disposeCityLabelCache(): void {
  for (const { texture } of cache.values()) texture.dispose();
  cache.clear();
}
