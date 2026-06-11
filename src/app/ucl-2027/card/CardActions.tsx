'use client';

import { motion } from 'motion/react';
import { toast } from '@/lib/toast';

interface Props {
  ogUrl: string;
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
  const objUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objUrl;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(objUrl);
}

export function CardActions({ ogUrl, teamName }: Props) {
  const slug = teamName.toLowerCase().replace(/\s+/g, '-');

  async function download() {
    try {
      await shareFile(ogUrl, `scorepath-${slug}-ucl2027.png`, `${teamName} · Champions League 2026/27`);
    } catch {
      toast('Download mislukt — probeer opnieuw.');
    }
  }

  async function shareLink() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: `${teamName} · Champions League 2026/27` });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast('Link gekopieerd.');
    } catch {
      /* noop */
    }
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={download}
        className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
      >
        Download kaart
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={shareLink}
        className="px-5 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
        style={{ border: '1px solid var(--border)', color: 'var(--fg)', borderRadius: '0 8px 0 8px' }}
      >
        Deel link
      </motion.button>
    </>
  );
}
