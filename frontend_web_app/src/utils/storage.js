import { } from './storage'; // placeholder to ensure module format

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
 * getRouteScopedSidebarMap - read expanded state map scoped to current route (pathname).
 * This allows remembering group open state per route.
 *
 * @param {string} routePath - pathname like "/category/buttons"
 * @returns {Record<string, boolean>}
 */
export function getRouteScopedSidebarMap(routePath = '') {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return {};
    const path = String(routePath || (window.location?.pathname ?? 'root'));
    const key = `sidebar.expanded.byRoute.v1::${path}`;
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
 * setRouteScopedSidebarMap - persist expanded state map scoped to a route path.
 *
 * @param {string} routePath
 * @param {Record<string, boolean>} map
 */
export function setRouteScopedSidebarMap(routePath = '', map = {}) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const path = String(routePath || (window.location?.pathname ?? 'root'));
    const key = `sidebar.expanded.byRoute.v1::${path}`;
    const safe = map && typeof map === 'object' ? map : {};
    window.localStorage.setItem(key, JSON.stringify(safe));
  } catch {
    // ignore storage errors
  }
}

/**
 * PUBLIC_INTERFACE
 * getSidebarAccordionSetting - returns boolean for accordion mode (default true).
 */
export function getSidebarAccordionSetting() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return true;
    const raw = window.localStorage.getItem('sidebar.accordion.v1');
    if (raw == null) return true; // default to true
    return raw === 'true';
  } catch {
    return true;
  }
}

/**
 * PUBLIC_INTERFACE
 * setSidebarAccordionSetting - persist accordion setting.
 * @param {boolean} value
 */
export function setSidebarAccordionSetting(value = true) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem('sidebar.accordion.v1', value ? 'true' : 'false');
  } catch {
    // ignore
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
