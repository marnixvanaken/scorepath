'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Player } from '@/data/players';

interface UserPos {
  lat: number;
  lon: number;
  name: string;
}

interface PlayerWithDistance extends Player {
  distance: number;
}

interface Props {
  userPos: UserPos;
  results: PlayerWithDistance[];
  highlightedIdx: number | null;
  osmAttrib: string;
  loadingMap: string;
}

function makeUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function makePlayerIcon(rank: number, highlighted: boolean) {
  const bg = highlighted ? '#f59e0b' : '#10b981';
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;background:${bg};border:2px solid white;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;">${rank}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function makeLabelIcon(text: string) {
  return L.divIcon({
    className: '',
    html: `<div style="background:rgba(0,0,0,.7);color:white;padding:2px 6px;border-radius:4px;font-size:11px;white-space:nowrap;">${text}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function MapController({
  userPos,
  results,
  highlightedIdx,
}: {
  userPos: UserPos;
  results: PlayerWithDistance[];
  highlightedIdx: number | null;
}) {
  const map = useMap();
  const prevUserPos = useRef<UserPos | null>(null);

  useEffect(() => {
    if (!userPos || results.length === 0) return;
    if (prevUserPos.current === userPos) return;
    prevUserPos.current = userPos;

    const points: L.LatLngTuple[] = [
      [userPos.lat, userPos.lon],
      ...results.map((p) => [p.lat, p.lon] as L.LatLngTuple),
    ];
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
  }, [userPos, results, map]);

  useEffect(() => {
    if (highlightedIdx === null) return;
    const p = results[highlightedIdx];
    if (!p) return;
    map.flyTo([p.lat, p.lon], Math.max(map.getZoom(), 8), { duration: 0.8 });
  }, [highlightedIdx, results, map]);

  return null;
}

export default function PlayerMap({ userPos, results, highlightedIdx, osmAttrib }: Props) {
  const nearest = results[0];

  const midLat = nearest ? (userPos.lat + nearest.lat) / 2 : 0;
  const midLon = nearest ? (userPos.lon + nearest.lon) / 2 : 0;
  const distLabel = nearest ? `${Math.round(nearest.distance).toLocaleString()} km` : '';

  return (
    <MapContainer
      center={[userPos.lat, userPos.lon]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={osmAttrib}
      />

      <MapController userPos={userPos} results={results} highlightedIdx={highlightedIdx} />

      <Marker position={[userPos.lat, userPos.lon]} icon={makeUserIcon()} />

      {nearest && (
        <>
          <Polyline
            positions={[
              [userPos.lat, userPos.lon],
              [nearest.lat, nearest.lon],
            ]}
            pathOptions={{ color: '#3b82f6', weight: 2, dashArray: '6 4', opacity: 0.8 }}
          />
          <Marker
            position={[midLat, midLon]}
            icon={makeLabelIcon(distLabel)}
          />
        </>
      )}

      {results.map((p, i) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lon]}
          icon={makePlayerIcon(i + 1, i === highlightedIdx)}
        />
      ))}

      <div
        className="leaflet-bottom leaflet-right"
        style={{ pointerEvents: 'none' }}
      >
        <div className="leaflet-control" style={{ fontSize: 10, padding: '2px 4px', background: 'rgba(255,255,255,.7)', color: '#333' }}>
          {osmAttrib}
        </div>
      </div>
    </MapContainer>
  );
}
