import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { applyTheme, getStoredTheme, saveTheme } from '../utils/theme';

/**
 * ThemeContext provides theme state and actions.
 * Values:
 * - theme: 'light' | 'dark'
 * - toggleTheme: () => void
 * - setTheme: (next: 'light'|'dark') => void
 */
const ThemeContext = createContext({
  theme: 'light',
  // no-op placeholders
  toggleTheme: () => {},
  setTheme: () => {},
});

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access current theme and actions from ThemeProvider. */
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /**
   * ThemeProvider initializes theme from localStorage or system preference,
   * applies it to documentElement, and keeps it in sync on changes.
   */
  const [theme, setThemeState] = useState(() => getStoredTheme());

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  // Respond to system preference changes if user hasn't explicitly chosen in this session
  useEffect(() => {
    if (!(window && window.matchMedia)) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const stored = getStoredTheme();
      // Only adjust if user doesn't have an explicit stored value
      try {
        const saved = localStorage.getItem('theme');
        if (saved !== 'light' && saved !== 'dark') {
          setThemeState(e.matches ? 'dark' : 'light');
        }
      } catch {
        if (stored !== 'light' && stored !== 'dark') {
          setThemeState(e.matches ? 'dark' : 'light');
        }
      }
    };
    if (media.addEventListener) media.addEventListener('change', handler);
    else media.addListener(handler); // Safari
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', handler);
      else media.removeListener(handler);
    };
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
