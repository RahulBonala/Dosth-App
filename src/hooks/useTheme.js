'use client';
import { useState, useCallback } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    return localStorage.getItem('dosth-theme') || 'light';
  } catch {
    return 'light';
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('dosth-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return { theme, toggle, isDark: theme === 'dark' };
}
