'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Club } from '@/data/clubs';
import { COMPETITIONS, UEFA_LABELS, countryName } from '@/data/clubs';
import { badgeInitials, badgeColor } from '@/lib/badge';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { GlobeMessages } from './GlobeFeature';

interface ClubPanelProps {
  club: Club | null;
  m: GlobeMessages;
  locale: string;
  onClose: () => void;
}

// Eén responsief paneel: links inschuivende drawer op desktop (globe blijft
// bedienbaar), bottom sheet met backdrop op mobiel.
export default function ClubPanel({ club, m, locale, onClose }: ClubPanelProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!club) return;
    // preventScroll: focus mag de overflow-hidden globe-container niet
    // verschuiven terwijl het paneel nog buiten beeld staat.
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [club, onClose]);

  const variants = isDesktop
    ? { hidden: { x: '-105%' }, shown: { x: 0 } }
    : { hidden: { y: '105%' }, shown: { y: 0 } };

  return (
    <AnimatePresence>
      {club && (
        <>
          {!isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-30 bg-black/40"
              onClick={onClose}
              aria-hidden
            />
          )}
          <motion.aside
            // Remount bij moduswissel: anders blijft de y-transform van de
            // bottom sheet hangen op de desktop-drawer (en andersom).
            key={`${club.id}:${isDesktop ? 'desktop' : 'mobile'}`}
            role="dialog"
            aria-label={club.name}
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={variants}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className={
              isDesktop
                ? 'absolute left-0 top-0 bottom-0 z-40 w-[360px] max-w-[90vw] overflow-y-auto shadow-2xl'
                : 'absolute left-0 right-0 bottom-0 z-40 max-h-[75%] overflow-y-auto rounded-t-2xl shadow-2xl'
            }
            style={{
              background: 'var(--bg-card)',
              borderRight: isDesktop ? '1px solid var(--border)' : undefined,
              borderTop: isDesktop ? undefined : '1px solid var(--border)',
            }}
          >
            <div className="p-5 sm:p-6">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label={m.close}
                className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full transition-opacity hover:opacity-60 c-fg-subtle"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <ClubHeader club={club} locale={locale} />
              <StadiumBlock club={club} m={m} />
              {club.uefa === 'UCL' && <UCLBlock locale={locale} m={m} />}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ClubHeader({ club, locale }: { club: Club; locale: string }) {
  const comp = COMPETITIONS[club.competition];
  return (
    <div className="flex items-center gap-4 pr-10">
      {club.crest ? (
        // Statisch gebundeld logo (public/logos); bewust geen next/image.
        <img src={club.crest} alt="" className="w-14 h-16 object-contain shrink-0" />
      ) : (
        <span
          aria-hidden
          className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-display text-xl border-2 border-white/70"
          style={{ background: club.colors?.[0] ?? badgeColor(club.id) }}
        >
          {badgeInitials(club.name)}
        </span>
      )}
      <div className="min-w-0">
        <h2 className="font-display text-2xl leading-tight tracking-wide truncate">{club.name}</h2>
        <p className="c-fg-muted text-sm flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w40/${club.country.toLowerCase()}.png`}
            alt=""
            className="w-5 h-auto border border-white/20"
            style={{ borderRadius: '0 4px 0 4px' }}
          />
          <span className="truncate">
            {countryName(club.country, locale)} · {comp?.label ?? club.competition}
            {club.uefa && <> · {UEFA_LABELS[club.uefa]}</>}
          </span>
        </p>
      </div>
    </div>
  );
}

function StadiumBlock({ club, m }: { club: Club; m: GlobeMessages }) {
  return (
    <div className="mt-5 rounded-lg p-4" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
      <p className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase mb-1">{m.stadiumLabel}</p>
      <p className="font-bold">{club.stadium.name}</p>
      <p className="c-fg-muted text-sm">
        {club.city}
        {club.stadium.capacity !== null && (
          <> · {club.stadium.capacity.toLocaleString()} {m.capacityWord}</>
        )}
      </p>
    </div>
  );
}

// Alleen zichtbaar voor clubs die zich voor de Champions League-league phase
// hebben geplaatst: knop naar de Scorepath-UCL-loting, in de bekende
// UCL-huisstijl (nachtblauw met goud).
function UCLBlock({ locale, m }: { locale: string; m: GlobeMessages }) {
  return (
    <div className="mt-5">
      <a
        href={`/${locale}/ucl-2027`}
        className="group flex items-center justify-between px-4 py-3.5 font-display tracking-widest transition-transform hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, #001D62 0%, #0A2A7A 55%, #001142 100%)',
          borderRadius: '0 12px 0 12px',
          boxShadow: '0 14px 34px -20px rgba(0, 29, 98, 0.85)',
        }}
      >
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: '#C9A843' }}>
            {m.uclEyebrow}
          </span>
          <span className="text-sm text-white truncate">{m.uclCta}</span>
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A843" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
