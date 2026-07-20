#!/usr/bin/env node
/**
 * scripts/build-land-dots.ts
 *
 * One-off script: sample the world-atlas land-110m TopoJSON (bundled npm
 * package, no network) into an evenly spaced grid of dots that lie on land.
 * The result drives the dotted-landmass layer of the club globe.
 *
 * Run:   npx tsx scripts/build-land-dots.ts
 *   or:  npm run build-land-dots
 *
 * Output: data/land-dots.json — a flat array of quantized coordinates
 * [lat*100, lng*100, lat*100, lng*100, ...] (integers, 0.01° precision).
 * The committed file is a snapshot; re-run only to tweak density.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { FeatureCollection, Geometry, MultiPolygon } from 'geojson';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'data', 'land-dots.json');

// Grid step in degrees at the equator. Longitude spacing is widened by
// 1/cos(lat) so dots stay visually evenly spaced on the sphere.
const STEP = 1.1;
// Skip the poles: no clubs there and Antarctica only adds noise/bytes.
const LAT_MIN = -60;
const LAT_MAX = 85;

async function main(): Promise<void> {
  const require = createRequire(import.meta.url);
  const topoPath = require.resolve('world-atlas/land-110m.json');
  const topology = JSON.parse(await fs.readFile(topoPath, 'utf8')) as Topology<{
    land: GeometryCollection<MultiPolygon>;
  }>;
  const land = feature(topology, topology.objects.land) as unknown as FeatureCollection<Geometry>;

  const dots: number[] = [];
  let tested = 0;
  for (let lat = LAT_MIN; lat <= LAT_MAX; lat += STEP) {
    const cos = Math.cos((lat * Math.PI) / 180);
    const lngStep = STEP / Math.max(cos, 0.05);
    // Offset alternate rows by half a step to avoid a rigid square grid.
    const offset = (Math.round((lat - LAT_MIN) / STEP) % 2) * (lngStep / 2);
    for (let lng = -180 + offset; lng < 180; lng += lngStep) {
      tested++;
      if (geoContains(land, [lng, lat])) {
        dots.push(Math.round(lat * 100), Math.round(lng * 100));
      }
    }
  }

  await fs.writeFile(OUT_FILE, JSON.stringify(dots));
  const count = dots.length / 2;
  const bytes = (await fs.stat(OUT_FILE)).size;
  console.log(`Tested ${tested} grid points, ${count} on land.`);
  console.log(`Wrote ${OUT_FILE} (${(bytes / 1024).toFixed(0)} kB).`);

  // Sanity checks: known land/sea points.
  const has = (lat: number, lng: number) => geoContains(land, [lng, lat]);
  if (!has(52.37, 4.9)) throw new Error('Sanity check failed: Amsterdam should be on land');
  if (has(30, -45)) throw new Error('Sanity check failed: mid-Atlantic should be sea');
  console.log('Sanity checks passed (Amsterdam on land, mid-Atlantic at sea).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
