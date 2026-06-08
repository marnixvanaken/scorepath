'use client';

import { motion } from 'motion/react';
import { toast } from '@/lib/toast';

interface Props {
  ogUrl: string;
  bracketUrl: string;
  teamName: string;
}

async function shareFile(url: string, filename: string, title: string) {
  const res = await fetch(url);
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
  URL.revokeObjectURL(objUrl);
}

export function CardActions({ ogUrl, bracketUrl, teamName }: Props) {
  const slug = teamName.toLowerCase().replace(/\s+/g, '-');

  async function downloadRoute() {
    try {
      await shareFile(ogUrl, `scorepath-${slug}-route-wk2026.png`, `${teamName} · Route WK 2026`);
    } catch {
      toast('Download mislukt — probeer de afbeelding lang indrukken om op te slaan.');
    }
  }

  async function downloadBracket() {
    try {
      await shareFile(bracketUrl, `scorepath-bracket-wk2026.png`, 'WK 2026 Bracket');
    } catch {
      toast('Download mislukt — probeer de afbeelding lang indrukken om op te slaan.');
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
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    toast('Link gekopieerd!');
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={downloadRoute}
        className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
      >
        ↓ ROUTE KAART
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={downloadBracket}
        className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
        style={{ background: '#1e3a5f', borderRadius: '0 8px 0 8px' }}
      >
        ↓ BRACKET
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={shareLink}
        className="px-5 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
        style={{ border: '1px solid var(--border)', color: 'var(--fg)', borderRadius: '0 8px 0 8px' }}
      >
        DEEL LINK
      </motion.button>
    </>
  );
}
