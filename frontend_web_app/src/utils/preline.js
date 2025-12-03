import { useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * initPreline - Safely import and initialize Preline's DOM behaviors.
 * Use this after content updates so data-hs-* elements are wired.
 */
export async function initPreline() {
  try {
    const mod = await import('preline');
    if (mod && typeof window !== 'undefined') {
      try {
        if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
          window.HSStaticMethods.autoInit();
        } else {
          document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
        }
      } catch {
        // ignore
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
