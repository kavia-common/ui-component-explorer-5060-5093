import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rawSidebarItems from '../../data/sidebarItems.json';
import { buildQueryString, parseQueryParams } from '../../utils/filter';
import {
  getSidebarExpandedMap,
  setSidebarExpandedMap,
  getRouteScopedSidebarMap,
  setRouteScopedSidebarMap,
  getSidebarAccordionSetting,
  isBrowser,
} from '../../utils/storage';
import Badge from './Badge';
import { getIconComponent } from '../../utils/icons';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Renders a collapsible, accessible navigation from a data config with compact, adaptive layout.
 * - Group headers show an icon; leaf items render text only (no icon) to save horizontal space.
 * - Sticky, slim global filter; full-height auto-fill scroll area with custom scrollbar.

 *
 * Props:
 * - onItemClick?: () => void (used by mobile drawer to close on navigate)
 */
function Sidebar({ onItemClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const filterInputRef = useRef(null);

  // Sanitize and harden sidebar config
  const sidebarItems = useMemo(() => {
    const sText = (v) => (typeof v === 'string' ? v : '');
    const sSlug = (v) => (typeof v === 'string' ? v : '');
    const groups = Array.isArray(rawSidebarItems) ? rawSidebarItems : [];
    const cleaned = groups
      .map((g) => {
        const group = sText(g.group);
        const slug = sSlug(g.slug);
        const blurb = sText(g.blurb);
        const icon = sText(g.icon);
        const items = Array.isArray(g.items) ? g.items : [];
        const cleanItems = items
          .map((it) => {
            const label = sText(it.label);
            const to = sText(it.to);
            const itemSlug = sSlug(it.slug);
            const badge = it.badge && (it.badge === 'New' || it.badge === '🔥') ? it.badge : undefined;
            const blurbIt = sText(it.blurb);
            const iconIt = sText(it.icon);
            if (!label || !itemSlug) return null;
            return { label, to, slug: itemSlug, badge, blurb: blurbIt, icon: iconIt };
          })
          .filter(Boolean);

        if (!group || !slug || cleanItems.length === 0) return null;
        return { group, slug, blurb, icon, items: cleanItems };
      })
      .filter(Boolean);

    return cleaned;
  }, []);

  // Local filter state (does not modify URL)
  const [query, setQuery] = useState('');
  const normalizedQuery = useMemo(() => query.trim().toLowerCase(), [query]);

  // Collapsed state map, persisted (global + route-scoped)
  const [open, setOpen] = useState({});
  const [accordion, setAccordion] = useState(true);

  useEffect(() => {
    if (!isBrowser()) return;
    setAccordion(getSidebarAccordionSetting());
    const routeScoped = getRouteScopedSidebarMap(location.pathname);
    const globalStored = getSidebarExpandedMap();
    const initialMap = Object.keys(routeScoped).length ? routeScoped : globalStored;
    if (initialMap && typeof initialMap === 'object') {
      setOpen((prev) => ({ ...prev, ...initialMap }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Ensure default false for all groups (unless persisted)
  useEffect(() => {
    if (!Array.isArray(sidebarItems)) return;
    const stored = getSidebarExpandedMap();
    const next = { ...(stored || {}) };
    sidebarItems.forEach((g) => {
      if (typeof next[g.slug] === 'undefined') next[g.slug] = false;
    });
    setOpen((prev) => ({ ...next, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarItems?.length]);

  useEffect(() => {
    setSidebarExpandedMap(open);
    setRouteScopedSidebarMap(location.pathname, open);
  }, [open, location.pathname]);

  const toggleGroup = (slug) => {
    setOpen((prev) => {
      let updated;
      const willOpen = !prev[slug];
      if (accordion && willOpen) {
        updated = Object.fromEntries(Object.keys(prev).map((k) => [k, k === slug]));
      } else {
        updated = { ...prev, [slug]: willOpen };
      }
      setSidebarExpandedMap(updated);
      setRouteScopedSidebarMap(location.pathname, updated);
      return updated;
    });
  };

  const { pathname, hash, search } = location;
  const activeKey = useMemo(() => `${pathname}${hash || ''}`, [pathname, hash]);

  const currentQuery = useMemo(() => parseQueryParams(search), [search]);
  const preservedQS = useMemo(() => buildQueryString(currentQuery), [currentQuery]);

  const buildNav = (_groupSlug, item) => {
    // Distinguish between single component items and category listings.
    // Leaf single components: type === 'component' MUST navigate to /component/:id
    if (item?.type === 'component') {
      const id = typeof item.id === 'string' ? item.id.trim() : '';
      if (id.length > 0) {
        return { pathname: `/component/${encodeURIComponent(id)}`, hash: '' };
      }
      // Invalid component id: return a disabled target (no navigation)
      return { pathname: '', hash: '' };
    }
    // Fallback: strict category listing page route /category/:slug
    const slug = typeof item?.slug === 'string' ? item.slug : '';
    return { pathname: `/category/${encodeURIComponent(slug)}`, hash: '' };
  };

  const go = (groupSlug, item) => (e) => {
    const nav = buildNav(groupSlug, item);
    navigate({ pathname: nav.pathname, search: preservedQS, hash: nav.hash }, { replace: false });
    onItemClick?.();
  };

  // Auto-open group containing active item, but honor persisted user toggle
  useEffect(() => {
    const next = {};
    sidebarItems.forEach((g) => {
      const isInGroup = g.items?.some((it) => {
        const nav = buildNav(g.slug, it);
        const key = `${nav.pathname}${nav.hash || ''}`;
        return key === activeKey || (nav.pathname === pathname && !!hash && nav.hash === hash);
      });
      next[g.slug] = typeof open[g.slug] === 'boolean' ? open[g.slug] : Boolean(isInGroup);
    });
    setOpen((prev) => {
      const merged = { ...prev, ...next };
      setSidebarExpandedMap(merged);
      return merged;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, sidebarItems]);

  const renderBadge = (badge) => {
    if (badge === 'New') {
      return <Badge color="gradientOutline">New</Badge>;
    }
    if (badge === '🔥') {
      return <Badge color="gradientSubtle">🔥</Badge>;
    }
    return null;
  };

  // Filtered view: filter groups and items by search query
  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return sidebarItems;
    return sidebarItems
      .map((g) => {
        const matchesGroup = g.group.toLowerCase().includes(normalizedQuery);
        const items = g.items.filter(
          (it) =>
            it.label.toLowerCase().includes(normalizedQuery) ||
            (it.blurb && it.blurb.toLowerCase().includes(normalizedQuery))
        );
        if (matchesGroup || items.length > 0) {
          return { ...g, items };
        }
        return null;
      })
      .filter(Boolean);
  }, [sidebarItems, normalizedQuery]);

  // If filtering, auto-expand groups that have matches for better discovery (not persisted)
  const isFiltering = normalizedQuery.length > 0;

  // Keyboard: allow focusing the filter quickly with '/'
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target;
        const tag = (target?.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          filterInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Mobile "Show more" visibility logic (progressive enhancement)
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(m.matches);
    update();
    if (m.addEventListener) m.addEventListener('change', update);
    else m.addListener(update);
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', update);
      else m.removeListener(update);
    };
  }, []);

  return (
    <nav aria-label="Sidebar navigation" className="flex h-full min-h-0 flex-col">
      {/* Sticky Search (slim). Avoids consuming too much space */}
      <div className="sticky top-0 z-10 bg-main-gradient/95 backdrop-blur supports-[backdrop-filter]:bg-main-gradient/85">
        <div className="px-2 pt-1.5 pb-1">
          <label htmlFor="sidebar-filter" className="sr-only">Filter categories</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-white/80">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <input
              ref={filterInputRef}
              id="sidebar-filter"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter components…"
              className="w-full rounded-md border border-white/15 bg-white/10 pl-7 pr-2 py-1.5 text-sm leading-5 text-white placeholder:text-white/70 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-transparent"
            />
          </div>
        </div>
      </div>

      {/* Scrollable content area auto-fills remaining height */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-2 pb-2">
        <div className="space-y-1 text-white min-h-0">
          {filteredGroups.map((group) => {
            const userOpen = !!open[group.slug];
            const isOpen = isFiltering ? true : userOpen;

            const GroupIcon = group?.icon ? getIconComponent(group.icon) : null;
            return (
              <div key={group.slug} className="rounded-md min-h-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`section-${group.slug}`}
                  onClick={() => toggleGroup(group.slug)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-left text-sm leading-5 font-semibold text-white transition sidebar-ring hover:bg-[rgb(37_99_235_/0.10)]"
                >
                  <span className="inline-flex items-center gap-2">
                    {GroupIcon ? <GroupIcon className="h-4 w-4 text-inherit" aria-hidden="true" /> : null}
                    <span className="text-white">{group.group}</span>
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 text-white/90 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  id={`section-${group.slug}`}
                  role="region"
                  aria-label={group.group}
                  className={`${isOpen ? 'block' : 'hidden'} min-h-0`}
                >
                  {/* Items container: constrained height with internal scroll to avoid pushing layout */}
                  <div className="min-h-0 max-h-[clamp(8rem,50vh,28rem)] overflow-y-auto custom-scrollbar">
                    <ul className="py-1 space-y-0.5">
                      {group.items?.map((it) => {
                        const nav = buildNav(group.slug, it);
                        const key = `${nav.pathname}${nav.hash || ''}`;
                        const active = key === activeKey && key !== '';
                        // Disable when author explicitly disabled OR when nav target is invalid (e.g., bad component id)
                        const isDisabled = it.disabled === true || !nav.pathname;
                        return (
                          <li key={`${group.slug}-${it.label}`}>
                            <Link
                              to={nav.pathname ? { pathname: nav.pathname, search: preservedQS, hash: nav.hash } : '#'}
                              onClick={(e) => {
                                if (isDisabled) {
                                  e.preventDefault();
                                  return;
                                }
                                e.preventDefault();
                                go(group.slug, it)(e);
                              }}
                              className={`group flex items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-sm leading-5 transition-colors duration-150 sidebar-ring ${
                                active
                                  ? 'sidebar-active-item text-white font-semibold'
                                  : 'text-slate-50 hover:bg-[rgb(37_99_235_/0.10)]'
                              } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                              aria-current={active ? 'page' : undefined}
                              aria-disabled={isDisabled || undefined}
                              tabIndex={isDisabled ? -1 : 0}
                            >
                              <span className="flex min-w-0 items-center">
                                <span className={`truncate ${active ? 'text-white' : 'text-slate-50'}`}>{it.label}</span>
                              </span>
                              <div className="ml-1 flex items-center gap-1.5">
                                {renderBadge(it.badge)}
                                <svg
                                  className={`h-3 w-3 ${active ? 'text-white' : 'text-slate-50'} group-hover:text-white`}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                      {group.items?.length === 0 && (
                        <li className="px-2 py-1 text-xs leading-5 text-white/80">No matches</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredGroups.length === 0 && (
            <div className="px-2 py-1.5 text-xs leading-5 text-white/80">No categories match your filter.</div>
          )}
        </div>
      </div>

      {/* Optional mobile Show more expander when content exceeds view height */}
      {isMobile && !mobileExpanded && (
        <div className="sticky bottom-0 z-10 bg-main-gradient/95 px-2 py-1.5">
          <button
            type="button"
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm leading-5 text-white hover:bg-[rgb(37_99_235_/0.10)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-transparent"
            onClick={() => setMobileExpanded(true)}
          >
            Show more
          </button>
        </div>
      )}
    </nav>
  );
}



export default Sidebar;
