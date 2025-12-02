//
// PUBLIC_INTERFACE
/**
 * Ocean Professional theme tokens and utility class maps for consistent styling.
 * Use these tokens to keep colors/gradients/typography consistent across components.
 */
export const oceanTheme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
  },
  // Tailwind class bundles to encourage consistent usage
  classes: {
    gradientSubtle: 'bg-gradient-to-b from-blue-500/10 to-gray-50 dark:from-blue-500/10 dark:to-gray-900',
    primaryText: 'text-blue-600 dark:text-blue-400',
    primaryBgSoft: 'bg-blue-50 dark:bg-blue-900/20',
    primaryRing: 'focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
    surfaceCard: 'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800',
    surfacePanel: 'rounded-xl border border-gray-200 bg-surface dark:border-gray-800 dark:bg-gray-900',
    heading: 'text-slate-900 dark:text-slate-100',
    body: 'text-slate-700 dark:text-slate-200',
    subtle: 'text-slate-600 dark:text-slate-300',
    // Sidebar specific utilities for consistent usage:
    sidebarHover: 'hover:bg-[rgb(37_99_235_/0.10)]',
    sidebarActive: 'sidebar-active-item',
    sidebarRing: 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-transparent',
  },
};

// PUBLIC_INTERFACE
export const gradient = {
  subtle: oceanTheme.classes.gradientSubtle,
  app: 'bg-app-gradient',
  main: 'bg-main-gradient',
};

// PUBLIC_INTERFACE
export const roles = {
  // Common role-based color helpers for badges, statuses, etc.
  info: 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20',
  success: 'text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-900/20',
  warn: 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/20',
  error: 'text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-900/20',
};

// PUBLIC_INTERFACE
/**
 * getComponentSnippet - read snippet from components.json entry; prefer "code", fallback to "jsxCode".
 * Returns a safe string (never undefined).
 */
export function getComponentSnippet(component) {
  if (!component) return '';
  return String(component.code || component.jsxCode || '');
}
