import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rawSidebarItems from '../../data/sidebarItems.json';
import { buildQueryString, parseQueryParams } from '../../utils/filter';
import Badge from './Badge';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Renders a collapsible, accessible navigation from a data config.
 * - Groups can be toggled open/closed and persist open-state per session.
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
        const items = Array.isArray(g.items) ? g.items : [];
        const cleanItems = items
          .map((it) => {
            const label = sanitizeText(it.label);
            const to = sanitizeText(it.to); // legacy field retained (may include #hash)
            const itemSlug = sanitizeSlug(it.slug);
            const badge = it.badge && (it.badge === 'New' || it.badge === '🔥') ? it.badge : undefined;
            const blurbIt = sanitizeText(it.blurb);

            if (!label || !itemSlug) return null;
            return { label, to, slug: itemSlug, badge, blurb: blurbIt };
          })
          .filter(Boolean);

        if (!group || !slug || cleanItems.length === 0) return null;
        return { group, slug, blurb, items: cleanItems };
      })
      .filter(Boolean);

    return cleaned;
  }, []);

  // Remember open groups in session for UX continuity
  const [open, setOpen] = useState(() => {
    try {
      const raw = sessionStorage.getItem('sidebar-open-groups');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('sidebar-open-groups', JSON.stringify(open));
    } catch {
      // ignore
    }
  }, [open]);

  const toggleGroup = (slug) => {
    setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));
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

  // Auto-open group if it contains the active route
  useEffect(() => {
    const next = {};
    sidebarItems.forEach((g) => {
      const isInGroup = g.items?.some((it) => {
        const nav = buildNav(g.slug, it);
        const key = `${nav.pathname}${nav.hash || ''}`;
        return key === activeKey || (nav.pathname === pathname && !!hash && nav.hash === hash);
      });
      next[g.slug] = isInGroup || open[g.slug] || false;
    });
    setOpen((prev) => ({ ...prev, ...next }));
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
              <span>{group.group}</span>
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
                        {/* Render label as plain text, never interpreted as HTML */}
                        <span className="truncate">{it.label}</span>
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
