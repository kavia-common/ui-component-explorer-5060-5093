import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * ThemeToggle provides a button to switch light/dark themes.
 * It uses ThemeContext to read and update the current theme.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-gray-50 hover:text-slate-900 focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        // subtle gradient ring accent on hover/focus without affecting dark contrast
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      }}
    >
      {isDark ? (
        <>
          <span role="img" aria-label="Sun">☀️</span>
          <span>Light</span>
        </>
      ) : (
        <>
          <span role="img" aria-label="Moon">🌙</span>
          <span>Dark</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
