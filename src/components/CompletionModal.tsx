'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Flag } from './Flag';

const WC_TITLES: Record<string, number> = {
  BRA: 5, GER: 4, ARG: 3, FRA: 2, URU: 2, ENG: 1, ESP: 1,
};

interface Props {
  visible: boolean;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onClose: () => void;
  teamId?: string | null;
}

export function CompletionModal({
  visible, title, description,
  primaryLabel, secondaryLabel,
  onPrimary, onClose,
  teamId,
}: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal — fixed center, onafhankelijk van scroll */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,_24rem)] rounded-2xl shadow-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {/* Sluit-knop */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-60 c-fg-subtle"
              aria-label="Sluiten"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="px-6 pt-8 pb-6 flex flex-col items-center gap-5 text-center">
              {/* Icoon */}
              {teamId ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 flex-wrap justify-center">
                    {Array.from({ length: (WC_TITLES[teamId] ?? 0) + 1 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#C9A843]" aria-hidden>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <Flag teamId={teamId} size={80} />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              {/* Tekst */}
              <div className="space-y-1.5">
                <h2 className="font-display text-2xl tracking-wider c-fg">{title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{description}</p>
              </div>

              {/* Knoppen */}
              <div className="w-full flex flex-col gap-2.5">
                <button
                  onClick={onPrimary}
                  className="w-full py-3.5 font-bold text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-90 active:opacity-80"
                  style={{ backgroundColor: '#D93B1F', borderRadius: '0 10px 0 10px' }}
                >
                  {primaryLabel}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-sm font-semibold transition-opacity hover:opacity-60"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  {secondaryLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
