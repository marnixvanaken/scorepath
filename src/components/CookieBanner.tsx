'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useMessages } from '@/hooks/useMessages';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie-consent')) setVisible(true);
    } catch {
      // localStorage unavailable
    }
  }, []);

  function updateConsent(granted: boolean) {
    try {
      localStorage.setItem('cookie-consent', granted ? 'granted' : 'denied');
    } catch {
      // ignore
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
          style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}
        >
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm flex-1 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {msg.cookie.text}{' '}
              <Link
                href={`/${lang}/privacy`}
                className="underline opacity-60 hover:opacity-100 transition-opacity"
              >
                {msg.cookie.privacyLabel}
              </Link>.
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => updateConsent(false)}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{ background: 'var(--bg-panel)', color: 'var(--fg-subtle)', border: '1px solid var(--border)' }}
              >
                {msg.cookie.decline}
              </button>
              <button
                onClick={() => updateConsent(true)}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-emerald-700 hover:bg-emerald-600 transition-colors"
              >
                {msg.cookie.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
