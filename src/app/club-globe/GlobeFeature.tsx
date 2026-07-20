'use client';

import type { Club } from '@/data/clubs';
import type { Messages } from '@/i18n/types';

export type GlobeMessages = Messages['globe'];

interface GlobeFeatureProps {
  clubs: Club[];
  m: GlobeMessages;
  locale: string;
}

export default function GlobeFeature({ clubs, m }: GlobeFeatureProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
        {m.loading} ({clubs.length})
      </p>
    </div>
  );
}
