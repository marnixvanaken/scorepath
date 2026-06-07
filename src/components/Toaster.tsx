'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { registerToastHandler } from '@/lib/toast';

type ToastItem = { id: number; msg: string; type: 'success' | 'error' };

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    let counter = 0;
    registerToastHandler((msg, type = 'success') => {
      const id = ++counter;
      setItems((prev) => [...prev, { id, msg, type }]);
      setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3000);
    });
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-xl border pointer-events-auto whitespace-nowrap ${
              t.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/25 text-emerald-300 backdrop-blur-md'
                : 'bg-red-950/90 border-red-500/25 text-red-300 backdrop-blur-md'
            }`}
          >
            {t.type === 'success' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
