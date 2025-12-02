//
// PUBLIC_INTERFACE
/**
 * getSidebarExpandedMap - safely read the persisted expanded state map for sidebar groups.
 * Uses a versioned key to allow future migrations without clobbering old values.
 *
 * Returns: Record<string, boolean>
 */
export function getSidebarExpandedMap() {
  const key = 'sidebar.expanded.v1';
  try {
    if (typeof window === 'undefined' || !window.localStorage) return {};
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * PUBLIC_INTERFACE
 * setSidebarExpandedMap - persist the expanded state map to localStorage.
 *
 * @param {Record<string, boolean>} map
 */
export function setSidebarExpandedMap(map = {}) {
  const key = 'sidebar.expanded.v1';
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const safe = map && typeof map === 'object' ? map : {};
    window.localStorage.setItem(key, JSON.stringify(safe));
  } catch {
    // ignore storage errors
  }
}

/**
 * PUBLIC_INTERFACE
 * isBrowser - utility to check if running in a browser (guards SSR or test envs).
 */
export function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
