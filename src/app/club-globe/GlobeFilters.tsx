'use client';

import { motion } from 'motion/react';
import { CAPACITY_PRESETS, isDefault, type GlobeFilters } from '@/lib/globeFilters';
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

  return (
    <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
      <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
        <span className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase hidden sm:inline">{m.tierLabel}</span>
        <PillGroup label={m.tierLabel} options={tierOptions} layoutId="globe-tier-pill" />
        <span className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase hidden sm:inline">{m.capacityLabel}</span>
        <PillGroup label={m.capacityLabel} options={capacityOptions} layoutId="globe-cap-pill" />
        {!isDefault(filters) && (
          <button
            onClick={() => onChange({ tier: null, minCapacity: null })}
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
