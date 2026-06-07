'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ShareButton } from './ShareButton';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip } from './Tooltip';
import { type InputMode, type LiveStatus } from '@/hooks/useSimulatorState';
import { NL } from '@/i18n/nl';

type View = 'groepsfase' | 'bracket';

interface Props {
  inputMode: InputMode;
  liveStatus: LiveStatus;
  view: View;
  onViewChange: (v: View) => void;
  onInputModeChange: (mode: InputMode) => void;
  onReset: () => void;
  onPrefill: () => void;
  onRefreshLive: () => void;
}

function LiveIndicator({ status, onRefresh }: { status: LiveStatus; onRefresh: () => void }) {
  if (status === 'loading') {
    return (
      <span className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
        <svg className="animate-spin shrink-0" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        {NL.header.liveLoading}
      </span>
    );
  }
  if (status === 'error') {
    return (
      <button
        onClick={onRefresh}
        className="flex items-center gap-1 text-[10px] transition-opacity hover:opacity-70"
        style={{ color: 'var(--gold)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
        {NL.header.liveError} — {NL.header.liveRefresh}
      </button>
    );
  }
  return null;
}

export function SimulatorHeader({
  inputMode, liveStatus, view,
  onViewChange, onInputModeChange, onReset, onPrefill, onRefreshLive,
}: Props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    if (moreOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [moreOpen]);

  return (
    <header
      className="sticky top-0 z-20 backdrop-blur-md px-4 py-2.5"
      style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo + view toggle */}
        <div className="flex items-center gap-3">
          <Link href="/" className="shrink-0 hover:opacity-70 transition-opacity" aria-label="Terug naar home">
            <Logo size="sm" />
          </Link>
          <span className="text-xs opacity-20" aria-hidden="true" style={{ color: 'var(--fg)' }}>/</span>

          <h1 className="font-display text-2xl leading-none tracking-wider shrink-0" style={{ color: 'var(--fg)' }}>
            <span style={{ color: 'var(--gold)' }}>WK</span>
            {' '}2026
          </h1>

          {/* View toggle */}
          <div
            className="flex rounded-lg p-0.5 gap-0.5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            role="group"
            aria-label="Weergave"
          >
            {(['groepsfase', 'bracket'] as View[]).map((v) => (
              <motion.button
                key={v}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewChange(v)}
                aria-pressed={view === v}
                className="relative px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
                style={{ color: view === v ? 'var(--fg)' : 'var(--fg-subtle)' }}
              >
                {view === v && (
                  <motion.span
                    layoutId="header-view-pill"
                    className="absolute inset-0 rounded-md"
                    style={{ background: 'var(--border)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">{v === 'groepsfase' ? 'Groepsfase' : 'Bracket'}</span>
              </motion.button>
            ))}
          </div>

          <LiveIndicator status={liveStatus} onRefresh={onRefreshLive} />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {view === 'groepsfase' && (
            <div
              className="flex rounded-lg p-0.5 gap-0.5"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              role="group"
              aria-label="Invoermodus"
            >
              {(['exact', 'quick'] as InputMode[]).map((mode) => (
                <Tooltip
                  key={mode}
                  text={mode === 'exact' ? 'Vul exacte scores in (bijv. 2–1)' : 'Kies alleen W / G / V per wedstrijd'}
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onInputModeChange(mode)}
                    aria-pressed={inputMode === mode}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold transition-all"
                    style={{
                      background: inputMode === mode ? 'var(--border)' : 'transparent',
                      color: inputMode === mode ? 'var(--fg)' : 'var(--fg-subtle)',
                    }}
                  >
                    {mode === 'exact' ? NL.modes.exact : NL.modes.quick}
                  </motion.button>
                </Tooltip>
              ))}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }} onClick={onPrefill}
            className="hidden sm:block px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
          >
            {NL.header.prefill}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }} onClick={onReset}
            className="hidden sm:block px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-subtle)' }}
          >
            {NL.header.reset}
          </motion.button>

          {/* ⋯ dropdown — alleen mobiel */}
          <div className="relative sm:hidden" ref={moreRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMoreOpen((v) => !v)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              aria-label="Meer opties"
            >
              ⋯
            </motion.button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute right-0 top-full mt-1 z-30 rounded-xl shadow-xl overflow-hidden min-w-[9rem]"
                  style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
                >
                  <button
                    onClick={() => { onPrefill(); setMoreOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors hover:opacity-70"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    {NL.header.prefill}
                  </button>
                  <button
                    onClick={() => { onReset(); setMoreOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors hover:opacity-70"
                    style={{ color: 'var(--fg-subtle)', borderTop: '1px solid var(--border)' }}
                  >
                    {NL.header.reset}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ShareButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
