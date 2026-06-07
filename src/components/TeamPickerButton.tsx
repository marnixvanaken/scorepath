'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { TEAMS } from '@/data/worldcup2026';
import { flagUrl } from '@/data/flags';

interface Props {
  s: string;
  k: string;
}

export function TeamPickerButton({ s, k }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const filtered = TEAMS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.nameEn.toLowerCase().includes(query.toLowerCase()) ||
    t.id.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 12);

  const pick = useCallback((teamId: string) => {
    setOpen(false);
    const params = new URLSearchParams();
    params.set('team', teamId);
    if (s) params.set('s', s);
    if (k) params.set('k', k);
    router.push(`/wk-2026/result?${params.toString()}`);
  }, [router, s, k]);

  return (
    <div className="relative" ref={panelRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--cta)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
        Mijn kaart
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute right-0 top-full mt-2 z-50 w-64 rounded-lg shadow-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--fg-subtle)' }}>
                Kies jouw land
              </p>
              <input
                autoFocus
                type="text"
                placeholder="Zoek een land..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-md outline-none"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg)',
                }}
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((team) => {
                const flag = flagUrl(team.id, 24);
                return (
                  <button
                    key={team.id}
                    onClick={() => pick(team.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{
                      color: 'var(--fg)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {flag && (
                      <span className="overflow-hidden rounded-sm shrink-0" style={{ border: '1px solid var(--border)' }}>
                        <Image src={flag} alt={team.name} width={20} height={14} unoptimized />
                      </span>
                    )}
                    <span>{team.name}</span>
                    <span className="ml-auto opacity-30 font-mono">{team.id}</span>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-xs text-center" style={{ color: 'var(--fg-subtle)' }}>
                  Geen team gevonden
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
