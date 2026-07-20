'use client';

import { useEffect, useRef } from 'react';
import borders from '../../../data/borders.json';
import { GlobeScene, type GlobeClub } from './globeScene';

interface ClubGlobeProps {
  clubs: GlobeClub[];
  visibleIds: Set<string> | null;
  selectedId: string | null;
  onClubClick: (id: string) => void;
}

// Thin React wrapper around the imperative GlobeScene (the PlayerMap role):
// mounts the scene once, then forwards prop changes to its API.
export default function ClubGlobe({ clubs, visibleIds, selectedId, onClubClick }: ClubGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<GlobeScene | null>(null);
  const clickRef = useRef(onClubClick);
  clickRef.current = onClubClick;

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new GlobeScene({
      canvas: canvasRef.current,
      borders: borders as number[][],
      clubs,
      onClubClick: (id) => clickRef.current(id),
    });
    sceneRef.current = scene;
    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { __globeScene?: GlobeScene }).__globeScene = scene;
    }
    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, [clubs]);

  useEffect(() => {
    sceneRef.current?.setFilter(visibleIds);
  }, [visibleIds]);

  useEffect(() => {
    sceneRef.current?.setSelected(selectedId);
    if (selectedId) sceneRef.current?.focusClub(selectedId);
  }, [selectedId]);

  return <canvas ref={canvasRef} className="block h-full w-full touch-none" style={{ cursor: 'grab' }} aria-hidden />;
}
