'use client';

import { useCallback, useEffect, useState } from 'react';

/* ============================================================
   THEME TOGGLE HOOK
   ============================================================ */
export default function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const current = saved || (document.documentElement.getAttribute('data-theme') || 'light');
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }, [theme]);

  return { theme, toggle };
}

export { useTheme };
