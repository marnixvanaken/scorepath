import * as THREE from 'three';
import type { GlobeClub } from './globeScene';

// Crest textures for globe sprites: real crest via the same-origin proxy
// (/api/crest/[clubId]) where available, otherwise a generated initials
// badge. Loaded through a small queue so zooming in doesn't fire 100+
// requests at once.

const TEXTURE_SIZE = 128;
const CONCURRENCY = 4;

const cache = new Map<string, Promise<THREE.Texture>>();
const created: THREE.Texture[] = [];

let active = 0;
const queue: (() => void)[] = [];

function withSlot<T>(job: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const run = () => {
      active++;
      job()
        .then(resolve, reject)
        .finally(() => {
          active--;
          queue.shift()?.();
        });
    };
    if (active < CONCURRENCY) run();
    else queue.push(run);
  });
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}

function toTexture(canvas: HTMLCanvasElement): THREE.Texture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  created.push(texture);
  return texture;
}

function drawCrest(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext('2d')!;
  // Contain-fit the crest with a little padding; crests are transparent.
  const pad = 8;
  const box = TEXTURE_SIZE - pad * 2;
  const ratio = Math.min(box / img.width, box / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  ctx.drawImage(img, (TEXTURE_SIZE - w) / 2, (TEXTURE_SIZE - h) / 2, w, h);
  return canvas;
}

// Tokens that don't belong in initials ("FC Utrecht" -> "U", not "FU").
const STOPWORDS = new Set(['fc', 'afc', 'cf', 'ac', 'as', 'ss', 'ssc', 'us', 'rc', 'rcd', 'cd', 'sd', 'ud', 'ca', 'sc', 'sv', 'vv', 'bv', 'de', '1.', 'aj', 'losc', 'ogc', 'tsg', 'vfb', 'vfl']);

export function badgeInitials(name: string): string {
  const words = name.split(/\s+/).filter((w) => !STOPWORDS.has(w.toLowerCase()));
  const source = words.length > 0 ? words : name.split(/\s+/);
  if (source.length === 1) return source[0].slice(0, 3).toUpperCase();
  return source.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
}

export function badgeColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const hue = ((hash % 360) + 360) % 360;
  return `hsl(${hue}, 42%, 38%)`;
}

function drawBadge(club: GlobeClub): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext('2d')!;
  const center = TEXTURE_SIZE / 2;
  const radius = center - 6;

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fillStyle = club.colors?.[0] ?? badgeColor(club.id);
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.stroke();

  const initials = badgeInitials(club.name);
  ctx.fillStyle = club.colors?.[1] ?? '#FFFFFF';
  ctx.font = `bold ${initials.length > 2 ? 42 : 52}px 'Barlow Condensed', 'Arial Narrow', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, center, center + 2);
  return canvas;
}

// Crests are bundled under public/logos (same-origin, imported by
// scripts/import-logos.ts), so they can be drawn to canvas without CORS fuss.
export function crestSrc(club: Pick<GlobeClub, 'id' | 'crest'>): string | null {
  return club.crest;
}

export function getClubTexture(club: GlobeClub): Promise<THREE.Texture> {
  const cached = cache.get(club.id);
  if (cached) return cached;

  const promise = withSlot(async () => {
    const src = crestSrc(club);
    if (src) {
      try {
        const img = await loadImage(src);
        return toTexture(drawCrest(img));
      } catch {
        // fall through to the generated badge
      }
    }
    return toTexture(drawBadge(club));
  });

  cache.set(club.id, promise);
  return promise;
}

export function disposeTextureCache(): void {
  created.forEach((t) => t.dispose());
  created.length = 0;
  cache.clear();
}
