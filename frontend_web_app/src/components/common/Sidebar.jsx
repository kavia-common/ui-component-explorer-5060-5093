import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rawSidebarItems from '../../data/sidebarItems.json';
import { buildQueryString, parseQueryParams } from '../../utils/filter';
import { getSidebarExpandedMap, setSidebarExpandedMap, isBrowser } from '../../utils/storage';
import Badge from './Badge';
import { getIconComponent } from '../../utils/icons';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Renders a collapsible, accessible navigation from a data config.
 * - Groups can be toggled open/closed and persist open-state across sessions (localStorage).
 * - Items navigate to category routes (/category/:slug) or category anchors (#sub) within the page.
 * - Highlights active item and auto-applies existing search/query string parameters.
 * - Strict mode: ensures only items provided in src/data/sidebarItems.json render.
 *
 * Props:
 * - onItemClick?: () => void (used by mobile drawer to close on navigate)
 */
function Sidebar({ onItemClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Quick validation and hardening of sidebar config to prevent accidental additions
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
            const to = sanitizeText(it.to); // legacy field retained (may include #hash)
            const itemSlug = sanitizeSlug(it.slug);
            const badge = it.badge && (it.badge === 'New' || it.badge === '🔥') ? it.badge : undefined;
            const blurbIt = sanitizeText(it.blurb);
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

  // Persisted expanded state (versioned) shared by desktop and mobile.
  // Default collapsed to avoid layout jank, then hydrate from storage on mount and when items hydrate.
  const [open, setOpen] = useState({});

  // Hydrate from storage once on mount
  useEffect(() => {
    if (!isBrowser()) return;
    const stored = getSidebarExpandedMap();
    if (stored && typeof stored === 'object') {
      setOpen((prev) => ({ ...prev, ...stored }));
    }
  }, []);

  // When the JSON config (sidebarItems) is ready, ensure open map includes keys for groups present.
  useEffect(() => {
    if (!Array.isArray(sidebarItems)) return;
    // Merge stored again in case load order differs and to ensure keys exist for current items.
    const stored = getSidebarExpandedMap();
    const next = { ...(stored || {}) };
    sidebarItems.forEach((g) => {
      if (typeof next[g.slug] === 'undefined') next[g.slug] = false;
    });
    setOpen((prev) => ({ ...next, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarItems?.length]);

  // Persist to storage whenever open map changes
  useEffect(() => {
    setSidebarExpandedMap(open);
  }, [open]);

  const toggleGroup = (slug) => {
    setOpen((prev) => {
      const updated = { ...prev, [slug]: !prev[slug] };
      // write-through to storage to avoid missed persistence on quick nav
      setSidebarExpandedMap(updated);
      return updated;
    });
  };

  // Active detection: check path and hash
  const { pathname, hash, search } = location;
  const activeKey = useMemo(() => `${pathname}${hash || ''}`, [pathname, hash]);

  // Preserve existing search params when navigating (keeps search/filter integration)
  const currentQuery = useMemo(() => parseQueryParams(search), [search]);
  const preservedQS = useMemo(() => buildQueryString(currentQuery), [currentQuery]);

  // Build navigation path from item slug -> /category/:slug with optional hash from legacy 'to'
  const buildNav = (groupSlug, item) => {
    const base = `/category/${encodeURIComponent(item.slug)}`;
    let itemHash = '';
    if (item.to) {
      try {
        const url = new URL(item.to, window.location.origin);
        itemHash = url.hash || '';
      } catch {
        // ignore invalid URLs; rely purely on slug route
      }
    }
    return { pathname: base, hash: itemHash };
  };

  // Handle item navigation including hash anchors while preserving query string
  const go = (groupSlug, item) => (e) => {
    const nav = buildNav(groupSlug, item);
    navigate({ pathname: nav.pathname, search: preservedQS, hash: nav.hash }, { replace: false });
    onItemClick?.();
  };

  // Auto-open group if it contains the active route; merge with existing open map.
  useEffect(() => {
    const next = {};
    sidebarItems.forEach((g) => {
      const isInGroup = g.items?.some((it) => {
        const nav = buildNav(g.slug, it);
        const key = `${nav.pathname}${nav.hash || ''}`;
        return key === activeKey || (nav.pathname === pathname && !!hash && nav.hash === hash);
      });
      // If already explicitly set in open, keep it; otherwise open if active route is in group.
      next[g.slug] = typeof open[g.slug] === 'boolean' ? open[g.slug] : Boolean(isInGroup);
    });
    setOpen((prev) => {
      const merged = { ...prev, ...next };
      setSidebarExpandedMap(merged);
      return merged;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, sidebarItems]);

  // Helper: render badge for specific allowed values
  const renderBadge = (badge) => {
    if (badge === 'New') {
      return <Badge color="blue">New</Badge>;
    }
    if (badge === '🔥') {
      // use amber style for hot
      return <Badge color="amber">🔥</Badge>;
    }
    return null;
  };

  return (
    <nav aria-label="Sidebar navigation" className="space-y-3">
      {sidebarItems.map((group) => {
        const isOpen = !!open[group.slug];
        return (
          <div key={group.slug} className="rounded-md border border-gray-200 dark:border-gray-800">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`section-${group.slug}`}
              onClick={() => toggleGroup(group.slug)}
              className="flex w-full items-center justify-between rounded-t-md bg-white px-3 py-2 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span className="inline-flex items-center gap-2">
                {(() => {
                  const GroupIcon = getIconComponent(group.icon);
                  return <GroupIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />;
                })()}
                {group.group}
              </span>
              <svg
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
              className={`border-t border-gray-200 dark:border-gray-800 ${isOpen ? 'block' : 'hidden'}`}
            >
              <ul className="bg-white p-1 max-h-80 overflow-y-auto dark:bg-gray-900">
                {group.items?.map((it) => {
                  const nav = buildNav(group.slug, it);
                  const key = `${nav.pathname}${nav.hash || ''}`;
                  const active = key === activeKey;
                  return (
                    <li key={`${group.slug}-${it.label}`}>
                      <Link
                        to={{ pathname: nav.pathname, search: preservedQS, hash: nav.hash }}
                        onClick={(e) => {
                          e.preventDefault();
                          go(group.slug, it)(e);
                        }}
                        className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary ${
                          active
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {/* Left side: icon + label */}
                        <span className="flex min-w-0 items-center gap-2">
                          {(() => {
                            const ItemIcon = getIconComponent(it.icon || it.slug);
                            return <ItemIcon className={`h-4 w-4 ${active ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" />;
                          })()}
                          <span className="truncate">{it.label}</span>
                        </span>
                        {/* Right side: badge + chevron */}
                        <div className="ml-2 flex items-center gap-2">
                          {renderBadge(it.badge)}
                          <svg
                            className={`h-3.5 w-3.5 ${active ? 'opacity-100' : 'opacity-60'}`}
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
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default Sidebar;
