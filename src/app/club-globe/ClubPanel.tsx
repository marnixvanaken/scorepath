'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Club } from '@/data/clubs';
import { COMPETITIONS, UEFA_LABELS, countryName } from '@/data/clubs';
import type { ClubMatch, ClubMatchesResponse } from '@/lib/footballDataMapper';
import { hotelsUrl, tripUrl, ticketsUrl, type AffiliateContext } from '@/lib/affiliates';
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
              {club.fdId !== null && <MatchesBlock club={club} m={m} locale={locale} />}
              <TripBlock club={club} m={m} />
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

function MatchesBlock({ club, m, locale }: { club: Club; m: GlobeMessages; locale: string }) {
  const [matches, setMatches] = useState<ClubMatch[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setMatches(null);
    fetch(`/api/club-matches?club=${encodeURIComponent(club.id)}`)
      .then((res) => (res.ok ? res.json() : { matches: [] }))
      .then((data: ClubMatchesResponse) => {
        if (!cancelled) setMatches(data.matches);
      })
      .catch(() => {
        if (!cancelled) setMatches([]);
      });
    return () => {
      cancelled = true;
    };
  }, [club.id]);

  return (
    <div className="mt-5">
      <p className="c-fg-subtle text-[11px] font-bold tracking-widest uppercase mb-2">{m.upcomingMatches}</p>
      {matches === null && <p className="c-fg-muted text-sm">{m.matchesLoading}</p>}
      {matches !== null && matches.length === 0 && <p className="c-fg-muted text-sm">{m.noMatches}</p>}
      {matches !== null && matches.length > 0 && (
        <ul className="flex flex-col gap-2">
          {matches.map((match) => (
            <li
              key={match.id}
              className="rounded-lg px-3 py-2 text-sm"
              style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
            >
              <p className="font-bold leading-snug">
                {match.home} – {match.away}
              </p>
              <p className="c-fg-muted text-xs">
                {new Date(match.utcDate).toLocaleDateString(locale, {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {match.competition && <> · {match.competition}</>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TripBlock({ club, m }: { club: Club; m: GlobeMessages }) {
  const ctx: AffiliateContext = {
    clubName: club.name,
    stadiumName: club.stadium.name,
    city: club.city,
    lat: club.lat,
    lng: club.lng,
  };
  const ctas = [
    { href: ticketsUrl(ctx), label: m.ctaTickets, primary: true },
    { href: hotelsUrl(ctx), label: m.ctaHotels, primary: false },
    { href: tripUrl(ctx), label: m.ctaTrip, primary: false },
  ];

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2">
        {ctas.map((cta) => (
          <a
            key={cta.label}
            href={cta.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 font-display tracking-widest text-sm transition-opacity hover:opacity-85"
            style={
              cta.primary
                ? { background: 'var(--cta)', color: '#fff', borderRadius: '0 10px 0 10px' }
                : { background: 'var(--bg-panel)', border: '1px solid var(--border-strong)', color: 'var(--fg)', borderRadius: '0 10px 0 10px' }
            }
          >
            {cta.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        ))}
      </div>
      <p className="c-fg-subtle text-[11px] mt-2 leading-relaxed">{m.affiliateDisclosure}</p>
    </div>
  );
}
