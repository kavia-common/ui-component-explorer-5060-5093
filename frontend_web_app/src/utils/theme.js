//
// PUBLIC_INTERFACE
/**
 * getStoredTheme - returns 'light' | 'dark' based on localStorage or system preference.
 */
export function getStoredTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ignore storage errors
  }
  // Fallback to system preference if no saved value
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * PUBLIC_INTERFACE
 * applyTheme - applies the theme to the documentElement by:
 * - setting data-theme for legacy styles bridge
 * - toggling Tailwind's dark class
 */
export function applyTheme(theme = 'light') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * PUBLIC_INTERFACE
 * saveTheme - persist user's theme selection to localStorage.
 */
export function saveTheme(theme = 'light') {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // ignore storage errors
  }
}
