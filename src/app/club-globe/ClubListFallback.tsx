'use client';

import type { Club } from '@/data/clubs';
import { COMPETITIONS } from '@/data/clubs';
import { badgeInitials, badgeColor } from '@/lib/badge';
import type { GlobeMessages } from './GlobeFeature';

interface ClubListFallbackProps {
  clubs: Club[];
  m: GlobeMessages;
  onSelect: (id: string) => void;
}

// Zonder WebGL (of voor toetsenbord/screenreader): dezelfde clubs als
// filterbare lijst, gegroepeerd per competitie; opent hetzelfde paneel.
export default function ClubListFallback({ clubs, m, onSelect }: ClubListFallbackProps) {
  const byCompetition = new Map<string, Club[]>();
  for (const club of clubs) {
    const list = byCompetition.get(club.competition) ?? [];
    list.push(club);
    byCompetition.set(club.competition, list);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl tracking-wide mb-1">{m.webglTitle}</h1>
      <p className="c-fg-muted text-sm mb-6">{m.webglDesc}</p>
      {[...byCompetition.entries()].map(([code, list]) => (
        <section key={code} className="mb-6">
          <h2 className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase mb-2">
            {COMPETITIONS[code]?.label ?? code}
          </h2>
          <ul className="flex flex-col gap-1">
            {list.map((club) => (
              <li key={club.id}>
                <button
                  onClick={() => onSelect(club.id)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-opacity hover:opacity-80"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  {club.crest ? (
                    <img src={club.crest} alt="" className="w-7 h-8 object-contain shrink-0" />
                  ) : (
                    <span
                      aria-hidden
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: badgeColor(club.id) }}
                    >
                      {badgeInitials(club.name)}
                    </span>
                  )}
                  <span className="font-semibold text-sm truncate">{club.name}</span>
                  <span className="c-fg-subtle text-xs ml-auto shrink-0">{club.city}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
