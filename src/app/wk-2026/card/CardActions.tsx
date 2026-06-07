'use client';

import { motion } from 'motion/react';
import { toast } from '@/lib/toast';

interface Props {
  ogUrl: string;
  teamName: string;
}

export function CardActions({ ogUrl, teamName }: Props) {
  async function downloadImage() {
    try {
      const res = await fetch(ogUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scorepath-${teamName.toLowerCase().replace(/\s+/g, '-')}-wk2026.png`;
      a.click();
      URL.revokeObjectURL(url);
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
        onClick={downloadImage}
        className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
      >
        DOWNLOAD AFBEELDING
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={shareLink}
        className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
        style={{ background: '#D93B1F', borderRadius: '0 8px 0 8px' }}
      >
        DEEL LINK
      </motion.button>
    </>
  );
}
