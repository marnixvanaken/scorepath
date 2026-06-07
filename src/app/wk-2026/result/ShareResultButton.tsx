'use client';

import { motion } from 'motion/react';
import { toast } from '@/lib/toast';

export function ShareResultButton() {
  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
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
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-sm text-white transition-opacity hover:opacity-90"
      style={{ background: 'var(--cta)' }}
    >
      DEEL LINK
    </motion.button>
  );
}
