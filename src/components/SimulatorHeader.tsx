'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShareButton } from './ShareButton';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { type InputMode, type LiveStatus } from '@/hooks/useSimulatorState';
import { useMessages } from '@/hooks/useMessages';

type View = 'groepsfase' | 'knockout';

interface Props {
  liveStatus: LiveStatus;
  view: View;
  onViewChange: (v: View) => void;
  onReset: () => void;
  onPrefill: () => void;
  onPrefillKnockout: () => void;
  onRefreshLive: () => void;
}

function LiveIndicator({ status, onRefresh }: { status: LiveStatus; onRefresh: () => void }) {
  const msg = useMessages();
  if (status === 'loading') {
    return (
      <span className="c-fg-subtle flex items-center gap-1.5 text-[11px]">
        <svg className="animate-spin shrink-0" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        {msg.header.liveLoading}
      </span>
    );
  }
  if (status === 'error') {
    return (
      <button
        onClick={onRefresh}
        className="c-gold flex items-center gap-1 text-[11px] min-h-[44px] transition-opacity hover:opacity-70"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
        {msg.header.liveError} — {msg.header.liveRefresh}
      </button>
    );
  }
  return null;
}

export function SimulatorHeader({
  liveStatus, view,
  onViewChange, onReset, onPrefill, onPrefillKnockout, onRefreshLive,
}: Props) {
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: Event) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    if (moreOpen) {
      document.addEventListener('mousedown', onOutside);
      document.addEventListener('touchstart', onOutside, { passive: true });
    }
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, [moreOpen]);

  const prefillBtn = view === 'groepsfase'
    ? { label: msg.header.prefill, action: onPrefill }
    : view === 'knockout'
    ? { label: msg.header.prefillKnockout, action: onPrefillKnockout }
    : null;

  return (
    <header
      className="sim-header sticky top-0 z-20 px-4"
      style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Row 1: Brand + meta actions ── */}
        <div className="flex items-center justify-between pt-3 pb-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href={`/${lang}`}
              className="shrink-0 hover:opacity-70 transition-opacity min-h-[44px] flex items-center"
              aria-label={msg.header.backToHome}
            >
              <Logo size="sm" />
            </Link>
            <span className="c-fg text-xs opacity-20" aria-hidden="true">/</span>
            <h1 className="font-display text-xl leading-none tracking-wider shrink-0 c-fg">
              <span className="c-gold">WK</span>
              {' '}2026
            </h1>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <LanguageSwitcher />
            <ShareButton />
            <ThemeToggle />
          </div>
        </div>

        {/* ── Row 2: View toggle + Mode selector + More ── */}
        <div className="flex items-center gap-1.5 pb-3">

          {/* ViewToggle — stretches full width on mobile */}
          <div
            className="view-toggle flex rounded-lg p-0.5 gap-0.5 flex-1 sm:flex-none"
            role="group"
            aria-label={msg.header.viewLabel}
          >
            {(['groepsfase', 'knockout'] as View[]).map((v) => (
              <motion.button
                key={v}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewChange(v)}
                aria-pressed={view === v}
                className={`relative flex-1 sm:flex-none px-2.5 min-h-[44px] flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${view === v ? 'c-fg' : 'c-fg-subtle'}`}
              >
                {view === v && (
                  <motion.span
                    layoutId="header-view-pill"
                    className="absolute inset-0 rounded-md view-pill"
                    style={{ pointerEvents: 'none' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">{v === 'groepsfase' ? msg.header.groupPhase : msg.header.knockout}</span>
              </motion.button>
            ))}
          </div>

          {/* Prefill + Reset — desktop only */}
          {prefillBtn && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={prefillBtn.action}
              className="ctrl-btn c-fg-muted hidden sm:flex items-center px-2.5 min-h-[44px] text-xs font-semibold rounded-lg transition-colors shrink-0"
            >
              {prefillBtn.label}
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="hidden sm:flex items-center px-2.5 min-h-[44px] text-xs font-semibold rounded-lg transition-colors shrink-0 text-white bg-red-700 hover:bg-red-600"
          >
            {msg.header.reset}
          </motion.button>

          {/* ⋯ dropdown — mobiel only */}
          <div className="relative sm:hidden shrink-0" ref={moreRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMoreOpen((v) => !v)}
              className="ctrl-btn c-fg-muted min-w-[44px] min-h-[44px] flex items-center justify-center text-sm font-bold rounded-lg transition-colors"
              aria-label={msg.header.moreOptions}
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
                  className="dropdown absolute right-0 top-full mt-1 z-30 rounded-xl shadow-xl overflow-hidden min-w-[9rem]"
                >
                  {prefillBtn && (
                    <button
                      onClick={() => { prefillBtn.action(); setMoreOpen(false); }}
                      className="c-fg-muted w-full text-left px-4 py-3 text-xs font-semibold transition-colors hover:opacity-70"
                    >
                      {prefillBtn.label}
                    </button>
                  )}
                  <button
                    onClick={() => { onReset(); setMoreOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-xs font-semibold transition-colors hover:opacity-70 text-red-400 ${prefillBtn ? 'dropdown-item-border' : ''}`}
                  >
                    {msg.header.reset}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </header>
  );
}
