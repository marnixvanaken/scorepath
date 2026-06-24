'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { toast } from '@/lib/toast';
import { useMessages } from '@/hooks/useMessages';

interface Props {
  ogUrl: string;
  bracketUrl: string;
  teamName: string;
}

// Beeldkleuren uit de OG-afbeeldingen — zo is er geen witte flits tijdens laden.
const IMG_BG = '#F2EDE4';
const SKEL = '#DED4C5';

async function shareFile(url: string, filename: string, title: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title });
    return;
  }

  // Desktop fallback: trigger download
  const objUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objUrl;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(objUrl), 100);
}

// Horizontale slide: nieuwe kaart komt van rechts (volgende) of links (vorige).
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const SWIPE_THRESHOLD = 60;

// Skeleton in de vorm van de route-kaart: kop, naam, label, divider, rijen.
function RouteSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col p-[7%] animate-pulse">
      <div className="h-[2%] w-[55%] rounded" style={{ background: SKEL }} />
      <div className="h-[8%] w-[78%] rounded mt-[5%]" style={{ background: SKEL }} />
      <div className="h-[10%] w-[62%] rounded mt-[3%]" style={{ background: SKEL }} />
      <div className="h-[0.5%] w-full rounded mt-[5%]" style={{ background: SKEL }} />
      <div className="flex-1 flex flex-col justify-center gap-[3%] mt-[5%]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[9%] w-full rounded" style={{ background: SKEL }} />
        ))}
      </div>
    </div>
  );
}

// Skeleton in de vorm van de bracket: kop + 5 kolommen, aflopend aantal blokjes.
function BracketSkeleton() {
  const cols = [16, 8, 4, 2, 1];
  return (
    <div className="absolute inset-0 flex flex-col p-[6%] animate-pulse">
      <div className="h-[2.5%] w-[40%] rounded" style={{ background: SKEL }} />
      <div className="flex-1 flex gap-[2%] mt-[4%]">
        {cols.map((n, ci) => (
          <div key={ci} className="flex-1 flex flex-col justify-around">
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="w-full rounded-sm" style={{ background: SKEL, height: '3%' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardViewer({ ogUrl, bracketUrl, teamName }: Props) {
  const msg = useMessages();
  const slug = teamName.toLowerCase().replace(/\s+/g, '-');

  // Elke kaart heeft zijn eigen, optimale verhouding. De container-hoogte
  // animeert vloeiend mee bij het wisselen, zodat elke kaart de viewer volledig
  // vult (geen letterbox-randen, geen lege ruimte).
  const slides = [
    { url: ogUrl, label: msg.card.routeTab, ratio: 2 / 3 },
    { url: bracketUrl, label: msg.card.bracketTab, ratio: 9 / 16 },
  ];

  // [index, richting] — richting bepaalt de animatie (1 = volgende, -1 = vorige).
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const active = slides[index];

  function markLoaded(i: number) {
    setLoaded((prev) => (prev[i] ? prev : { ...prev, [i]: true }));
  }

  function paginate(next: number) {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (clamped === index) return;
    setPage([clamped, clamped > index ? 1 : -1]);
  }

  function onDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(index - 1);
  }

  async function downloadRoute() {
    try {
      await shareFile(ogUrl, `scorepath-${slug}-route-wk2026.png`, `${teamName} · Route WK 2026`);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      toast(msg.card.downloadFailed);
    }
  }

  async function downloadBracket() {
    try {
      await shareFile(bracketUrl, 'scorepath-bracket-wk2026.png', 'WK 2026 Bracket');
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      toast(msg.card.downloadFailed);
    }
  }

  async function shareLink() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: `${teamName} · WK 2026` });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    toast(msg.card.linkCopied);
  }

  const hasPrev = index > 0;
  const hasNext = index < slides.length - 1;

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4">
      {/* Onzichtbare preloader: laadt beide kaarten vooraf zodat swipen snappy is
          en de skeleton zo kort mogelijk zichtbaar blijft. */}
      <div aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        {slides.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s.url} src={s.url} alt="" onLoad={() => markLoaded(i)} onError={() => markLoaded(i)} />
        ))}
      </div>

      {/* Tab-toggle: Route / Bracket */}
      <div
        className="flex gap-0.5 p-0.5 rounded-full"
        style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
        role="tablist"
        aria-label={teamName}
      >
        {slides.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={i === index}
            onClick={() => paginate(i)}
            className="px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-colors"
            style={
              i === index
                ? { background: 'var(--cta)', color: '#fff' }
                : { color: 'var(--fg-subtle)' }
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Horizontale swipe-carousel — ratio animeert per kaart, crème laadkleur */}
      <motion.div
        className="relative w-full overflow-hidden rounded-lg shadow-xl"
        style={{ aspectRatio: 2 / 3, background: IMG_BG, border: '1px solid var(--border)' }}
        animate={{ aspectRatio: active.ratio }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 32 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ background: IMG_BG }}
          >
            {/* Skeleton in de vorm van de betreffende kaart, tot de afbeelding laadt */}
            {!loaded[index] && (index === 0 ? <RouteSkeleton /> : <BracketSkeleton />)}
            {/*
              pointer-events blijven AAN op de afbeelding zodat rechtsklik
              (desktop) en lang-indrukken (mobiel) "kopiëren/opslaan" tonen.
              draggable={false} houdt de swipe vrij van native image-drag.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url}
              alt={`${teamName} ${active.label}`}
              onLoad={() => markLoaded(index)}
              onError={() => markLoaded(index)}
              className="absolute inset-0 h-full w-full object-contain select-none transition-opacity duration-300"
              style={{ opacity: loaded[index] ? 1 : 0 }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe-affordance: pulserende pijlen (ook klikbaar) */}
        {hasPrev && (
          <motion.button
            onClick={() => paginate(index - 1)}
            aria-label={slides[index - 1].label}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', backdropFilter: 'blur(2px)' }}
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
        {hasNext && (
          <motion.button
            onClick={() => paginate(index + 1)}
            aria-label={slides[index + 1].label}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 h-9 pl-2.5 pr-3 rounded-full"
            style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', backdropFilter: 'blur(2px)' }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[10px] font-bold tracking-widest uppercase">{slides[index + 1].label}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}

        {/* Positie-dots onderaan */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.label}
              onClick={() => paginate(i)}
              aria-label={s.label}
              className="rounded-full transition-all duration-300"
              style={{
                height: 7,
                width: i === index ? 22 : 7,
                background: i === index ? 'var(--cta)' : 'rgba(0,0,0,0.25)',
              }}
            />
          ))}
        </div>
      </motion.div>

      <p className="text-[11px] tracking-wide" style={{ color: 'var(--fg-subtle)' }}>
        {msg.card.swipeHint}
      </p>

      {/* Beide kaarten apart downloadbaar + deel-link */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={downloadRoute}
          className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
        >
          {msg.card.downloadRouteCard}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={downloadBracket}
          className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
          style={{ background: '#1e3a5f', borderRadius: '0 8px 0 8px' }}
        >
          {msg.card.downloadBracket}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={shareLink}
          className="px-5 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ border: '1px solid var(--border)', color: 'var(--fg)', borderRadius: '0 8px 0 8px' }}
        >
          {msg.card.shareLink}
        </motion.button>
      </div>
    </div>
  );
}
