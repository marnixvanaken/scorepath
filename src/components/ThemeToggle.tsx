'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initial = saved ?? 'dark';
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-full border border-[--border] text-[--fg] text-xs font-bold tracking-wide hover:border-[--border-strong] transition-colors"
      aria-label="Wissel kleurthema"
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'}
    </button>
  );
}
