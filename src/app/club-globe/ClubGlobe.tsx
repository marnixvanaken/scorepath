'use client';

import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ClubMap, type MapClub } from './clubMap';

interface ClubGlobeProps {
  clubs: MapClub[];
  visibleIds: Set<string> | null;
  selectedId: string | null;
  onClubClick: (id: string) => void;
}

// Thin React wrapper around the imperative ClubMap (MapLibre globe):
// mounts the map once, then forwards prop changes to its API.
export default function ClubGlobe({ clubs, visibleIds, selectedId, onClubClick }: ClubGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<ClubMap | null>(null);
  const clickRef = useRef(onClubClick);
  clickRef.current = onClubClick;

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new ClubMap({
      container: containerRef.current,
      clubs,
      onClubClick: (id) => clickRef.current(id),
    });
    mapRef.current = map;
    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { __clubMap?: ClubMap }).__clubMap = map;
    }
    return () => {
      map.dispose();
      mapRef.current = null;
    };
  }, [clubs]);

  useEffect(() => {
    mapRef.current?.setFilter(visibleIds);
  }, [visibleIds]);

  useEffect(() => {
    mapRef.current?.setSelected(selectedId);
    if (selectedId) mapRef.current?.focusClub(selectedId);
  }, [selectedId]);

  // Buitenste div positioneert; de binnenste is de MapLibre-container
  // (MapLibre zet daar zelf position:relative op, dat mag niet onze
  // absolute plaatsing overschrijven).
  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
