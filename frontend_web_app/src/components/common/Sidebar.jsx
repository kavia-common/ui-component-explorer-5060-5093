import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sidebarItems from '../../data/sidebarItems.json';
import { buildQueryString, parseQueryParams } from '../../utils/filter';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Renders a collapsible, accessible navigation from a data config.
 * - Groups can be toggled open/closed and persist open-state per session.
 * - Items navigate to category routes (/category/:slug) or category anchors (#sub) within the page.
 * - Highlights active item and auto-applies existing search/query string parameters.
 *
 * Props:
 * - onItemClick?: () => void (used by mobile drawer to close on navigate)
 */
function Sidebar({ onItemClick }) {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Handle item navigation including hash anchors while preserving query string
  const go = (to) => (e) => {
    // Build target keeping any anchors but also keep query params
    const url = new URL(to, window.location.origin);
    const pathOnly = url.pathname;
    const nextHash = url.hash || '';
    navigate({ pathname: pathOnly, search: preservedQS, hash: nextHash }, { replace: false });
    onItemClick?.();
  };

  // Auto-open group if it contains the active route
  useEffect(() => {
    const next = {};
    sidebarItems.forEach((g) => {
      const isInGroup = g.items?.some((it) => {
        const u = new URL(it.to, window.location.origin);
        const key = `${u.pathname}${u.hash || ''}`;
        return key === activeKey || (u.pathname === pathname && !!hash && u.hash === hash);
      });
      next[g.slug] = isInGroup || open[g.slug] || false;
    });
    setOpen((prev) => ({ ...prev, ...next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

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
              className={`overflow-hidden border-t border-gray-200 transition-[max-height] dark:border-gray-800 ${isOpen ? 'max-h-[640px]' : 'max-h-0'}`}
            >
              <ul className="bg-white p-1 dark:bg-gray-900">
                {group.items?.map((it) => {
                  const url = new URL(it.to, window.location.origin);
                  const key = `${url.pathname}${url.hash || ''}`;
                  const active = key === activeKey;
                  return (
                    <li key={`${group.slug}-${it.label}`}>
                      <Link
                        to={{ pathname: url.pathname, search: preservedQS, hash: url.hash }}
                        onClick={(e) => {
                          e.preventDefault();
                          go(it.to)(e);
                        }}
                        className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary ${
                          active
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span>{it.label}</span>
                        <svg
                          className={`h-3.5 w-3.5 ${active ? 'opacity-100' : 'opacity-60'}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
