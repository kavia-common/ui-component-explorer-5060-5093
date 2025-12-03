import { useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * initPreline - Safely import and initialize Preline's DOM behaviors.
 * Use this after content updates so data-hs-* elements are wired.
 *
 * IMPORTANT:
 * - We explicitly import from the compiled JS build 'preline' (NOT 'preline/src')
 *   to avoid CRA/Webpack trying to parse TypeScript sources.
 */
 // PUBLIC_INTERFACE
export async function initPreline() {
  try {
    // Dynamically import the compiled distribution bundle to avoid TS sources.
    const mod = await import('preline');
    if (mod && typeof window !== 'undefined') {
      try {
        // Prefer official autoInit when available
        if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
          window.HSStaticMethods.autoInit();
        } else {
          // Fallback: dispatch DOMContentLoaded so components can self-initialize
          document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
        }
      } catch {
        // ignore initialization errors so UI continues to load
      }
    }
  } catch {
    // ignore import errors in non-browser contexts
  }
}

/**
 * PUBLIC_INTERFACE
 * usePreline - React hook to init Preline after mount and on dependency changes.
 * Call in pages/layouts that render Preline-driven components/markup.
 */
export function usePreline(deps = []) {
  useEffect(() => {
    initPreline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
