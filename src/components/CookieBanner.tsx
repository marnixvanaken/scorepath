'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div
        className="max-w-2xl mx-auto rounded-xl shadow-2xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="text-[13px] flex-1" style={{ color: 'var(--fg-muted)' }}>
          {msg.cookie.text}{' '}
          <Link href={`/${lang}/privacy`} className="underline opacity-70 hover:opacity-100 transition-opacity">
            {msg.cookie.privacyLabel}
          </Link>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => updateConsent(false)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors"
            style={{ background: 'var(--bg-panel)', color: 'var(--fg-subtle)', border: '1px solid var(--border)' }}
          >
            {msg.cookie.decline}
          </button>
          <button
            onClick={() => updateConsent(true)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-emerald-700 hover:bg-emerald-600 transition-colors"
          >
            {msg.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
