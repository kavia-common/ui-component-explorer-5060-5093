import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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
  getGroupPref,
  setGroupPref,
} from '../../utils/storage';
import Badge from './Badge';
import { getIconComponent } from '../../utils/icons';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Renders a collapsible, accessible navigation from a data config with compact, adaptive layout.
 * - Group headers show an icon; leaf items render text only (no icon) to save horizontal space.
 * - Sticky, slim global filter; full-height auto-fill scroll area with custom scrollbar.
 * - For very large groups (e.g., Base components), adds:
 *   1) Virtualized windowed list rendering,
 *   2) Sticky alphabetical sub-index and sticky in-list subheaders,
 *   3) Compact "Collapse all / Expand all" control in sticky header,
 *   4) Local filter scoped to that group only,
 *   5) Default show first N with "Show more", persisted per group,
 *   6) Only list region scrolls; smooth performance,
 *   7) Persist group-expanded, show more, and filter states in localStorage.
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
    const base = `/category/${encodeURIComponent(item.slug)}`;
    let itemHash = '';
    if (item.to) {
      try {
        const url = new URL(item.to, window.location.origin);
        itemHash = url.hash || '';
      } catch {
        // ignore bad url in data
      }
    }
    return { pathname: base, hash: itemHash };
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
        <div className="space-y-1 text-white">
          {filteredGroups.map((group) => {
            const userOpen = !!open[group.slug];
            const isOpen = isFiltering ? true : userOpen;

            if (group.slug === 'base-components') {
              return (
                <LargeBaseGroup
                  key={group.slug}
                  group={group}
                  isOpen={isOpen}
                  onToggle={() => toggleGroup(group.slug)}
                  activeKey={activeKey}
                  preservedQS={preservedQS}
                  go={go}
                  buildNav={buildNav}
                  renderBadge={renderBadge}
                />
              );
            }

            const GroupIcon = group?.icon ? getIconComponent(group.icon) : null;
            return (
              <div key={group.slug} className="rounded-md">
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
                  className={`${isOpen ? 'block' : 'hidden'}`}
                >
                  <ul className="py-1 space-y-0.5">
                    {group.items?.map((it) => {
                      const nav = buildNav(group.slug, it);
                      const key = `${nav.pathname}${nav.hash || ''}`;
                      const active = key === activeKey;
                      const isDisabled = it.disabled === true;
                      return (
                        <li key={`${group.slug}-${it.label}`}>
                          <Link
                            to={{ pathname: nav.pathname, search: preservedQS, hash: nav.hash }}
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

/**
 * LargeBaseGroup - advanced containment for very large groups like "Base components".
 * Implements local filter, alphabetical sub-index, sticky subheaders, windowed rendering, and show more.
 */
function LargeBaseGroup({ group, isOpen, onToggle, activeKey, preservedQS, go, buildNav, renderBadge }) {
  const GroupIcon = group?.icon ? getIconComponent(group.icon) : null;
  const baseSlug = group.slug;
  const persisted = getGroupPref(baseSlug);
  const DEFAULT_N = 12;
  const [localFilter, setLocalFilter] = useState(persisted.filter || '');
  const [showAll, setShowAll] = useState(Boolean(persisted.showAll));
  const [collapseAll, setCollapseAll] = useState(false);

  const normalizedLocal = (localFilter || '').trim().toLowerCase();
  const filteredItems = useMemo(() => {
    if (!normalizedLocal) return group.items;
    return group.items.filter(
      (it) =>
        it.label.toLowerCase().includes(normalizedLocal) ||
        (it.blurb && it.blurb.toLowerCase().includes(normalizedLocal))
    );
  }, [group.items, normalizedLocal]);

  const limitedItems = useMemo(() => {
    if (showAll) return filteredItems;
    return filteredItems.slice(0, DEFAULT_N);
  }, [filteredItems, showAll]);

  const buildAlphaGroups = useCallback((items = []) => {
    const map = new Map();
    items.forEach((it) => {
      const letter = (it.label?.[0] || '#').toUpperCase();
      const key = /[A-Z]/.test(letter) ? letter : '#';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(it);
    });
    const letters = Array.from(map.keys()).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });
    return letters.map((l) => ({
      letter: l,
      items: map.get(l).sort((a, b) => a.label.localeCompare(b.label)),
    }));
  }, []);

  const alphaGroups = useMemo(() => buildAlphaGroups(limitedItems), [limitedItems, buildAlphaGroups]);

  const rows = useMemo(() => {
    const r = [];
    alphaGroups.forEach((ag) => {
      r.push({ type: 'header', key: `h-${ag.letter}`, letter: ag.letter });
      ag.items.forEach((it) => r.push({ type: 'item', key: `i-${ag.letter}-${it.slug}`, item: it }));
    });
    return r;
  }, [alphaGroups]);

  const containerRef = useRef(null);
  const ROW_H = 32;
  const HDR_H = 28;

  const heights = useMemo(() => rows.map((r) => (r.type === 'header' ? HDR_H : ROW_H)), [rows]);
  const prefixHeights = useMemo(() => {
    const out = new Array(heights.length + 1).fill(0);
    for (let i = 1; i <= heights.length; i++) out[i] = out[i - 1] + heights[i - 1];
    return out;
  }, [heights]);
  const totalHeight = prefixHeights[prefixHeights.length - 1];

  const [range, setRange] = useState({ start: 0, end: Math.min(rows.length - 1, 40) });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const top = el.scrollTop;
        const viewport = el.clientHeight;
        let s = 0;
        let e = prefixHeights.length - 1;
        while (s < e) {
          const m = (s + e) >> 1;
          if (prefixHeights[m] < top) s = m + 1;
          else e = m;
        }
        const startIdx = Math.max(0, s - 1);
        let s2 = startIdx;
        let e2 = prefixHeights.length - 1;
        const target = top + viewport;
        while (s2 < e2) {
          const m2 = Math.floor((s2 + e2) / 2);
          if (prefixHeights[m2] < target) s2 = m2 + 1;
          else e2 = m2;
        }
        const endIdx = Math.min(rows.length - 1, s2);
        setRange({
          start: Math.max(0, startIdx - 8),
          end: Math.min(rows.length - 1, endIdx + 8),
        });
      });
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [prefixHeights, rows.length]);

  useEffect(() => {
    setGroupPref(baseSlug, { filter: localFilter });
  }, [baseSlug, localFilter]);
  useEffect(() => {
    setGroupPref(baseSlug, { showAll });
  }, [baseSlug, showAll]);

  const indexLetters = useMemo(() => alphaGroups.map((g) => g.letter), [alphaGroups]);
  const onJump = (letter) => {
    const headerIdx = rows.findIndex((r) => r.type === 'header' && r.letter === letter);
    if (headerIdx >= 0) {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTo({ top: prefixHeights[headerIdx], behavior: 'smooth' });
    }
  };

  const collapseAllLetters = () => setCollapseAll(true);
  const expandAllLetters = () => setCollapseAll(false);

  const visibleRows = useMemo(() => {
    if (!collapseAll) return rows;
    const firstLetter = alphaGroups[0]?.letter;
    return rows.filter(
      (r) =>
        (r.type === 'header' && r.letter === firstLetter) ||
        (r.type === 'item' && r.key.startsWith(`i-${firstLetter}-`))
    );
  }, [collapseAll, rows, alphaGroups]);

  const vHeights = useMemo(() => visibleRows.map((r) => (r.type === 'header' ? HDR_H : ROW_H)), [visibleRows]);
  const vPrefix = useMemo(() => {
    const out = new Array(vHeights.length + 1).fill(0);
    for (let i = 1; i <= vHeights.length; i++) out[i] = out[i - 1] + vHeights[i - 1];
    return out;
  }, [vHeights]);
  const vTotal = vPrefix[vPrefix.length - 1];
  const [vRange, setVRange] = useState({ start: 0, end: Math.min(visibleRows.length - 1, 40) });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const top = el.scrollTop;
        const viewport = el.clientHeight;
        let s = 0, e = vPrefix.length - 1;
        while (s < e) {
          const m = (s + e) >> 1;
          if (vPrefix[m] < top) s = m + 1;
          else e = m;
        }
        const startIdx = Math.max(0, s - 1);
        let s2 = startIdx, e2 = vPrefix.length - 1;
        const target = top + viewport;
        while (s2 < e2) {
          const m2 = Math.floor((s2 + e2) / 2);
          if (vPrefix[m2] < target) s2 = m2 + 1;
          else e2 = m2;
        }
        const endIdx = Math.min(visibleRows.length - 1, s2);
        setVRange({ start: Math.max(0, startIdx - 8), end: Math.min(visibleRows.length - 1, endIdx + 8) });
      });
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [vPrefix, visibleRows.length]);

  return (
    <div className="rounded-md">
      <div className="sticky top-0 z-[1] flex items-center justify-between rounded-md px-2 py-2.5 text-sm font-semibold text-white/95 bg-main-gradient/80 backdrop-blur">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`section-${group.slug}`}
          onClick={onToggle}
          className="inline-flex items-center gap-2 sidebar-ring rounded-md px-1.5 py-1 hover:bg-white/10"
        >
          {GroupIcon ? <GroupIcon className="h-4 w-4 text-white" aria-hidden="true" /> : null}
          <span className="text-white">{group.group}</span>
          <svg className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={collapseAllLetters}
            className="rounded-md px-2 py-1 text-xs text-white/90 hover:bg-white/10 sidebar-ring"
            aria-label="Collapse all subgroups"
            title="Collapse all"
          >
            Collapse
          </button>
          <button
            type="button"
            onClick={expandAllLetters}
            className="rounded-md px-2 py-1 text-xs text-white/90 hover:bg-white/10 sidebar-ring"
            aria-label="Expand all subgroups"
            title="Expand all"
          >
            Expand
          </button>
        </div>
      </div>

      <div id={`section-${group.slug}`} role="region" aria-label={group.group} className={`${isOpen ? 'block' : 'hidden'}`}>
        {/* Local filter + alpha index */}
        <div className="sticky top-[40px] z-[1] bg-main-gradient/75 backdrop-blur px-2 py-1.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <label className="sr-only" htmlFor={`${group.slug}-filter`}>Filter {group.group}</label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-white/80">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                id={`${group.slug}-filter`}
                type="search"
                value={localFilter}
                onChange={(e) => setLocalFilter(e.target.value)}
                placeholder={`Filter in ${group.group}…`}
                className="w-full rounded-md border border-white/15 bg-white/10 pl-7 pr-2 py-1.5 text-sm leading-5 text-white placeholder:text-white/70 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-transparent"
              />
            </div>
            <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
              {indexLetters.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onJump(l)}
                  className="rounded px-1.5 py-0.5 text-xs text-white/90 hover:bg-white/10 sidebar-ring"
                  aria-label={`Jump to ${l}`}
                  title={l}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Virtualized list region: only this area scrolls */}
        <div ref={containerRef} className="max-h-[55vh] overflow-y-auto custom-scrollbar px-0.5" role="listbox" aria-label={`${group.group} items`}>
          <div style={{ height: collapseAll ? vTotal : totalHeight, position: 'relative' }}>
            {(collapseAll ? visibleRows.slice(vRange.start, vRange.end + 1) : rows.slice(range.start, range.end + 1)).map((row, idx) => {
              const realIndex = (collapseAll ? vRange.start : range.start) + idx;
              const top = (collapseAll ? vPrefix : prefixHeights)[realIndex];
              if (row.type === 'header') {
                return (
                  <div
                    key={row.key}
                    className="sticky z-0 px-2"
                    style={{ position: 'absolute', top, height: HDR_H, left: 0, right: 0 }}
                    aria-hidden="true"
                  >
                    <div className="sticky top-[72px] -mx-0.5 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80 bg-main-gradient/60 backdrop-blur rounded">
                      {row.letter}
                    </div>
                  </div>
                );
              }
              const it = row.item;
              const nav = buildNav(group.slug, it);
              const key = `${nav.pathname}${nav.hash || ''}`;
              const active = key === activeKey;
              const isDisabled = it.disabled === true;
              return (
                <div
                  key={row.key}
                  style={{ position: 'absolute', top, height: ROW_H, left: 0, right: 0 }}
                >
                  <Link
                    to={{ pathname: nav.pathname, search: preservedQS, hash: nav.hash }}
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Show more / Show all */}
        {filteredItems.length > DEFAULT_N && (
          <div className="px-2 py-1.5">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm leading-5 text-white hover:bg-[rgb(37_99_235_/0.10)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-transparent"
              aria-expanded={showAll}
              aria-controls={`section-${group.slug}`}
            >
              {showAll ? `Show less` : `Show ${filteredItems.length - DEFAULT_N} more`}
            </button>
          </div>
        )}

        {/* Empty state for local filter */}
        {filteredItems.length === 0 && (
          <div className="px-2 py-2 text-xs leading-5 text-white/80">No matches in {group.group}.</div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
