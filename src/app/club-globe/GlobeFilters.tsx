'use client';

import { motion } from 'motion/react';
import { COMPETITIONS, UEFA_LABELS } from '@/data/clubs';
import { CAPACITY_PRESETS, UEFA_COMPS, isDefault, type GlobeFilters } from '@/lib/globeFilters';
import type { GlobeMessages } from './GlobeFeature';

interface GlobeFiltersBarProps {
  filters: GlobeFilters;
  onChange: (filters: GlobeFilters) => void;
  shownCount: number;
  m: GlobeMessages;
}

interface PillOption {
  label: string;
  active: boolean;
  onSelect: () => void;
}

function PillGroup({ label, options, layoutId }: { label: string; options: PillOption[]; layoutId: string }) {
  return (
    <div className="view-toggle flex rounded-lg p-0.5 gap-0.5" role="group" aria-label={label}>
      {options.map((opt) => (
        <motion.button
          key={opt.label}
          whileTap={{ scale: 0.95 }}
          onClick={opt.onSelect}
          aria-pressed={opt.active}
          className={`relative px-2.5 min-h-[44px] flex items-center justify-center rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${opt.active ? 'c-fg' : 'c-fg-subtle'}`}
        >
          {opt.active && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-md view-pill"
              style={{ pointerEvents: 'none' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative">{opt.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

export default function GlobeFiltersBar({ filters, onChange, shownCount, m }: GlobeFiltersBarProps) {
  const tierOptions: PillOption[] = [
    { label: m.tierAll, active: filters.tier === null, onSelect: () => onChange({ ...filters, tier: null }) },
    { label: m.tier1, active: filters.tier === 1, onSelect: () => onChange({ ...filters, tier: 1 }) },
    { label: m.tier2, active: filters.tier === 2, onSelect: () => onChange({ ...filters, tier: 2 }) },
  ];
  const capacityOptions: PillOption[] = [
    { label: m.capAny, active: filters.minCapacity === null, onSelect: () => onChange({ ...filters, minCapacity: null }) },
    ...CAPACITY_PRESETS.map((cap) => ({
      label: `${cap / 1000}k+`,
      active: filters.minCapacity === cap,
      onSelect: () => onChange({ ...filters, minCapacity: cap }),
    })),
  ];

  const uefaOptions: PillOption[] = [
    { label: m.uefaAll, active: filters.uefa === null, onSelect: () => onChange({ ...filters, uefa: null }) },
    ...UEFA_COMPS.map((comp) => ({
      label: UEFA_LABELS[comp],
      active: filters.uefa === comp,
      onSelect: () => onChange({ ...filters, uefa: comp }),
    })),
  ];

  return (
    <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
      <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
        <label className="sr-only" htmlFor="globe-comp">{m.competitionLabel}</label>
        <select
          id="globe-comp"
          value={filters.competition ?? ''}
          onChange={(e) => onChange({ ...filters, competition: e.target.value || null })}
          className="view-toggle rounded-lg px-2.5 min-h-[44px] text-xs font-semibold c-fg"
        >
          <option value="">{m.compAll}</option>
          {Object.entries(COMPETITIONS).map(([code, meta]) => (
            <option key={code} value={code}>{meta.label}</option>
          ))}
        </select>
        <span className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase hidden lg:inline">{m.uefaLabel}</span>
        <PillGroup label={m.uefaLabel} options={uefaOptions} layoutId="globe-uefa-pill" />
        <span className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase hidden lg:inline">{m.tierLabel}</span>
        <PillGroup label={m.tierLabel} options={tierOptions} layoutId="globe-tier-pill" />
        <span className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase hidden lg:inline">{m.capacityLabel}</span>
        <PillGroup label={m.capacityLabel} options={capacityOptions} layoutId="globe-cap-pill" />
        {!isDefault(filters) && (
          <button
            onClick={() => onChange({ tier: null, minCapacity: null, competition: null, uefa: null })}
            className="c-fg-muted text-xs font-semibold min-h-[44px] px-2 underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {m.resetFilters}
          </button>
        )}
      </div>
      <span
        className="ml-auto pointer-events-auto rounded-md px-2.5 py-1.5 text-xs font-semibold c-fg-muted"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        aria-live="polite"
      >
        {m.clubsShown.replace('{n}', String(shownCount))}
      </span>
    </div>
  );
}
