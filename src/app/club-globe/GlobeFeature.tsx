'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { Club } from '@/data/clubs';
import type { Messages } from '@/i18n/types';
import { isWebGLAvailable } from './webgl';

export type GlobeMessages = Messages['globe'];

const ClubGlobe = dynamic(() => import('./ClubGlobe'), {
  ssr: false,
  loading: () => <GlobeLoading />,
});

function GlobeLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div
        className="h-8 w-8 rounded-full border-2 animate-spin"
        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--cta)' }}
      />
    </div>
  );
}

interface GlobeFeatureProps {
  clubs: Club[];
  m: GlobeMessages;
  locale: string;
}

export default function GlobeFeature({ clubs, m }: GlobeFeatureProps) {
  // null = not probed yet (first client render), then true/false.
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  if (webgl === false) {
    return (
      <div className="absolute inset-0 overflow-y-auto px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-2xl tracking-wide mb-2">{m.webglTitle}</h1>
          <p className="c-fg-muted text-sm">{m.webglDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <p className="sr-only">{m.globeHint}</p>
      {webgl && (
        <ClubGlobe
          clubs={clubs}
          visibleIds={null}
          selectedId={selectedId}
          onClubClick={(id) => setSelectedId(id)}
        />
      )}
      {webgl === null && <GlobeLoading />}
    </div>
  );
}
