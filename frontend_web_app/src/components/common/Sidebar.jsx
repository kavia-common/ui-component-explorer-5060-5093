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
 * - Group headers display an icon; leaf items render label only (no icon).
 * - Handles missing icons gracefully and avoids spacing gaps.
 * - Groups can be toggled and persist across sessions.
 *
 * Props:
 * - onItemClick?: () => void (used by mobile drawer to close on navigate)
 */
function Sidebar({ onItemClick }) {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [open, setOpen] = useState({});

  useEffect(() => {
    if (!isBrowser()) return;
    const stored = getSidebarExpandedMap();
    if (stored && typeof stored === 'object') {
      setOpen((prev) => ({ ...prev, ...stored }));
    }
  }, []);

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

  // Layout: tightened spacing and consistent states for gradient background
  return (
    <nav aria-label="Sidebar navigation" className="space-y-2 bg-main-gradient rounded-xl p-2 text-white">
      {sidebarItems.map((group) => {
        const isOpen = !!open[group.slug];
        const GroupIcon = group?.icon ? getIconComponent(group.icon) : null;

        return (
          <div key={group.slug} className="rounded-md">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`section-${group.slug}`}
              onClick={() => toggleGroup(group.slug)}
              className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm font-semibold text-white transition hover:underline sidebar-focus-ring"
            >
              <span className="inline-flex items-center gap-2">
                {GroupIcon ? (
                  <GroupIcon className="h-4 w-4 text-inherit" aria-hidden="true" />
                ) : null}
                {/* Group header text kept high contrast */}
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
              <ul className="max-h-80 overflow-y-auto py-0.5">
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
                            ? 'text-white font-semibold underline'
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
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default Sidebar;
