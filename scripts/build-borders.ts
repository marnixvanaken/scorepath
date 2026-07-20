#!/usr/bin/env node
/**
 * scripts/build-borders.ts
 *
 * One-off script: extract country borders (including coastlines) from the
 * world-atlas 50m TopoJSON (bundled npm package, no network) into compact
 * polylines that drive the border-lines layer of the club globe.
 *
 * Run:   npx tsx scripts/build-borders.ts
 *   or:  npm run build-borders
 *
 * Output: data/borders.json — an array of polylines, each a flat array of
 * quantized coordinates [lat*100, lng*100, ...] (integers, 0.01° precision).
 * The committed file is a snapshot; re-run only to change resolution.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'data', 'borders.json');

async function main(): Promise<void> {
  const require = createRequire(import.meta.url);
  const topoPath = require.resolve('world-atlas/countries-50m.json');
  const topology = JSON.parse(await fs.readFile(topoPath, 'utf8')) as Topology<{
    countries: GeometryCollection;
  }>;

  // mesh() dedupes shared arcs: every border/coastline segment appears once.
  const lines = mesh(topology, topology.objects.countries);

  const polylines: number[][] = [];
  let points = 0;
  for (const line of lines.coordinates) {
    const flat: number[] = [];
    let prevLat = NaN;
    let prevLng = NaN;
    for (let p = 0; p < line.length; p++) {
      const [lng, lat] = line[p];
      const qLat = Math.round(lat * 100);
      const qLng = Math.round(lng * 100);
      // Decimate: drop points closer than ~0.06° to the previous kept
      // point (invisible at our zoom range), but always keep endpoints so
      // adjacent border lines stay connected.
      const last = p === line.length - 1;
      if (!last && Math.abs(qLat - prevLat) + Math.abs(qLng - prevLng) < 6) continue;
      flat.push(qLat, qLng);
      prevLat = qLat;
      prevLng = qLng;
    }
    if (flat.length < 4) continue;
    // Drop specks: tiny island rings smaller than ~0.3° in both directions.
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
    for (let i = 0; i < flat.length; i += 2) {
      minLat = Math.min(minLat, flat[i]); maxLat = Math.max(maxLat, flat[i]);
      minLng = Math.min(minLng, flat[i + 1]); maxLng = Math.max(maxLng, flat[i + 1]);
    }
    if (maxLat - minLat < 30 && maxLng - minLng < 30) continue;
    polylines.push(flat);
    points += flat.length / 2;
  }

  await fs.writeFile(OUT_FILE, JSON.stringify(polylines));
  const bytes = (await fs.stat(OUT_FILE)).size;
  console.log(`Wrote ${polylines.length} polylines (${points} points) to ${OUT_FILE} (${(bytes / 1024).toFixed(0)} kB).`);

  // Sanity check: at least one segment near the Dutch coast (~52°N, 4-5°E).
  const nearNl = polylines.some((line) => {
    for (let i = 0; i < line.length; i += 2) {
      if (line[i] > 5150 && line[i] < 5350 && line[i + 1] > 350 && line[i + 1] < 550) return true;
    }
    return false;
  });
  if (!nearNl) throw new Error('Sanity check failed: no border points near the Dutch coast');
  console.log('Sanity check passed (Dutch coastline present).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
