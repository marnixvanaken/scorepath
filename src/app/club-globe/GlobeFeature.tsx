'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Club } from '@/data/clubs';
import type { Messages } from '@/i18n/types';
import { isWebGLAvailable } from './webgl';
import ClubPanel from './ClubPanel';

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

export default function GlobeFeature({ clubs, m, locale }: GlobeFeatureProps) {
  // null = nog niet geprobed (eerste client-render), daarna true/false.
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clubById = useMemo(() => new Map(clubs.map((c) => [c.id, c])), [clubs]);

  // De URL is de bron van waarheid voor de selectie (?club=) — deelbaar en
  // deep-linkbaar; onzin-waarden vallen terug op "niets geselecteerd".
  const selectedClub = clubById.get(searchParams.get('club') ?? '') ?? null;

  const setSelected = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set('club', id);
      else params.delete('club');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

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
    <div className="absolute inset-0 overflow-hidden">
      <p className="sr-only">{m.globeHint}</p>
      {webgl && (
        <ClubGlobe
          clubs={clubs}
          visibleIds={null}
          selectedId={selectedClub?.id ?? null}
          onClubClick={(id) => setSelected(id)}
        />
      )}
      {webgl === null && <GlobeLoading />}
      <ClubPanel club={selectedClub} m={m} locale={locale} onClose={() => setSelected(null)} />
    </div>
  );
}
