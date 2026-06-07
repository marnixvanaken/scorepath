'use client';

import { motion } from 'motion/react';
import { NL } from '@/i18n/nl';
import { toast } from '@/lib/toast';

export function ShareButton() {
  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    toast(NL.header.copied);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-colors"
      aria-label={NL.header.share}
    >
      <ShareIcon />
      {NL.header.share}
    </motion.button>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

