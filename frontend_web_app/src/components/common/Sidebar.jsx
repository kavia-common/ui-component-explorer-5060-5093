import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rawSidebarItems from '../../data/sidebarItems.json';
import { buildQueryString, parseQueryParams } from '../../utils/filter';
import { getSidebarExpandedMap, setSidebarExpandedMap, isBrowser } from '../../utils/storage';
import Badge from './Badge';
import { getIconComponent } from '../../utils/icons';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Renders a collapsible, accessible navigation from a data config.
 * - Group headers display an icon; leaf items render label only (no icon).
 * - Handles missing icons gracefully and avoids spacing gaps.
 * - Groups can be toggled and persist across sessions.
 * - Includes integrated search filter for categories/items.
 *
 * Props:
 * - onItemClick?: () => void (used by mobile drawer to close on navigate)
 */
function Sidebar({ onItemClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const filterInputRef = useRef(null);

  // Quick validation and hardening of sidebar config
  const sidebarItems = useMemo(() => {
    const sanitizeText = (v) => (typeof v === 'string' ? v : '');
    const sanitizeSlug = (v) => (typeof v === 'string' ? v : '');
    const groups = Array.isArray(rawSidebarItems) ? rawSidebarItems : [];
    const cleaned = groups
      .map((g) => {
        const group = sanitizeText(g.group);
        const slug = sanitizeSlug(g.slug);
        const blurb = sanitizeText(g.blurb);
        const icon = sanitizeText(g.icon);
        const items = Array.isArray(g.items) ? g.items : [];
        const cleanItems = items
          .map((it) => {
            const label = sanitizeText(it.label);
            const to = sanitizeText(it.to);
            const itemSlug = sanitizeSlug(it.slug);
            const badge = it.badge && (it.badge === 'New' || it.badge === '🔥') ? it.badge : undefined;
            const blurbIt = sanitizeText(it.blurb);
            // keep icon field in data but ignore in rendering for leaf items
            const iconIt = sanitizeText(it.icon);

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

  // Local search state (does not modify URL)
  const [query, setQuery] = useState('');
  const normalizedQuery = useMemo(() => query.trim().toLowerCase(), [query]);

  // Collapsed state map, persisted
  const [open, setOpen] = useState({});

  useEffect(() => {
    if (!isBrowser()) return;
    const stored = getSidebarExpandedMap();
    if (stored && typeof stored === 'object') {
      setOpen((prev) => ({ ...prev, ...stored }));
    }
  }, []);

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
  }, [open]);

  const toggleGroup = (slug) => {
    setOpen((prev) => {
      const updated = { ...prev, [slug]: !prev[slug] };
      setSidebarExpandedMap(updated);
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
        // ignore
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

  // Ocean Professional styled sidebar with integrated search
  return (
    <nav aria-label="Sidebar navigation" className="space-y-3">
      {/* Search/filter input */}
      <div className="px-1">
        <label htmlFor="sidebar-filter" className="sr-only">Filter categories</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/80">
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
            className="w-full rounded-md border border-white/20 bg-white/10 px-8 py-1.5 text-sm text-white placeholder:text-white/70 outline-none sidebar-focus-ring"
          />
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-2 bg-main-gradient rounded-xl p-2 text-white">
        {filteredGroups.map((group) => {
          const userOpen = !!open[group.slug];
          const isOpen = isFiltering ? true : userOpen;
          const GroupIcon = group?.icon ? getIconComponent(group.icon) : null;

          return (
            <div key={group.slug} className="rounded-md">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`section-${group.slug}`}
                onClick={() => toggleGroup(group.slug)}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm font-semibold text-white transition sidebar-focus-ring sidebar-hover-overlay"
              >
                <span className="inline-flex items-center gap-2">
                  {GroupIcon ? <GroupIcon className="h-4 w-4 text-inherit" aria-hidden="true" /> : null}
                  <span className="text-white">{group.group}</span>
                </span>
                <svg
                  className={`h-4 w-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                <ul className="custom-scrollbar max-h-80 overflow-y-auto py-0.5">
                  {group.items?.map((it) => {
                    const nav = buildNav(group.slug, it);
                    const key = `${nav.pathname}${nav.hash || ''}`;
                    const active = key === activeKey;

                    // Support disabled/non-clickable items (optional flag)
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
                          className={`group flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-all duration-150 sidebar-focus-ring ${
                            active
                              ? 'active-main-gradient text-white font-semibold'
                              : 'text-slate-50 hover:underline'
                          } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                          aria-current={active ? 'page' : undefined}
                          aria-disabled={isDisabled || undefined}
                          tabIndex={isDisabled ? -1 : 0}
                        >
                          <span className="flex min-w-0 items-center">
                            {/* Leaf items: text only (no icon) */}
                            <span className={`truncate ${active ? 'text-white' : 'text-slate-50'}`}>{it.label}</span>
                          </span>
                          <div className="ml-1.5 flex items-center gap-1.5">
                            {renderBadge(it.badge)}
                            <svg
                              className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-slate-50'} group-hover:text-white`}
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
                    <li className="px-2.5 py-2 text-xs text-white/80">No matches</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
        {filteredGroups.length === 0 && (
          <div className="px-2.5 py-2 text-xs text-white/80">No categories match your filter.</div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
