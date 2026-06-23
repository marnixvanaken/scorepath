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

// Verticale slide: nieuwe kaart komt van onder (volgende) of boven (vorige).
const variants = {
  enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const SWIPE_THRESHOLD = 60;

export function CardViewer({ ogUrl, bracketUrl, teamName }: Props) {
  const msg = useMessages();
  const slug = teamName.toLowerCase().replace(/\s+/g, '-');

  const slides = [
    {
      url: ogUrl,
      label: msg.card.routeTab,
      file: `scorepath-${slug}-route-wk2026.png`,
      title: `${teamName} · Route WK 2026`,
      download: msg.card.downloadRouteCard,
    },
    {
      url: bracketUrl,
      label: msg.card.bracketTab,
      file: 'scorepath-bracket-wk2026.png',
      title: 'WK 2026 Bracket',
      download: msg.card.downloadBracket,
    },
  ];

  // [index, richting] — richting bepaalt de animatie (1 = omlaag, -1 = omhoog).
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const active = slides[index];

  function paginate(next: number) {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (clamped === index) return;
    setPage([clamped, clamped > index ? 1 : -1]);
  }

  function onDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.y < -SWIPE_THRESHOLD) paginate(index + 1);
    else if (info.offset.y > SWIPE_THRESHOLD) paginate(index - 1);
  }

  async function downloadActive() {
    try {
      await shareFile(active.url, active.file, active.title);
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

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-5">
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

      {/* Verticale swipe-carousel */}
      <div
        className="relative w-full overflow-hidden rounded-lg shadow-xl"
        style={{ aspectRatio: '2 / 3', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
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
              y: { type: 'spring', stiffness: 300, damping: 32 },
              opacity: { duration: 0.2 },
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url}
              alt={`${teamName} ${active.label}`}
              className="h-full w-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Verticale dot-indicator */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {slides.map((s, i) => (
            <button
              key={s.label}
              onClick={() => paginate(i)}
              aria-label={s.label}
              className="rounded-full transition-all duration-300"
              style={{
                width: 7,
                height: i === index ? 22 : 7,
                background: i === index ? 'var(--cta)' : 'var(--border)',
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-[11px] tracking-wide" style={{ color: 'var(--fg-subtle)' }}>
        {msg.card.swipeHint}
      </p>

      {/* Acties — download volgt de zichtbare kaart */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={downloadActive}
          className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
          style={{ background: index === 0 ? 'var(--cta)' : '#1e3a5f', borderRadius: '0 8px 0 8px' }}
        >
          {active.download}
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
