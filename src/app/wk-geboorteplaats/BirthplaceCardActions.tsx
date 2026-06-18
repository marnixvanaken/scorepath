'use client';

import { motion } from 'motion/react';
import { toast } from '@/lib/toast';
import { useMessages } from '@/hooks/useMessages';

interface Props {
  ogUrl: string;
}

async function downloadFile(url: string, filename: string, title: string) {
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

export function BirthplaceCardActions({ ogUrl }: Props) {
  const msg = useMessages();
  const m = msg.birthplace;

  async function download() {
    try {
      await downloadFile(ogUrl, 'scorepath-geboorteplaats-wk2026.png', 'WK 2026 Geboorteplaats');
    } catch {
      toast(msg.card.downloadFailed);
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={download}
      className="px-5 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
      style={{ background: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
    >
      {m.downloadCard}
    </motion.button>
  );
}
