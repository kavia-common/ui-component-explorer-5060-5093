import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CategoryList - Renders categories list with active state.
 * Props:
 * - categories: Array<{ name, slug }>
 * - onItemClick?: (slug) => void
 */
function CategoryList({ categories = [], onItemClick }) {
  const location = useLocation();
  const activeSlug = location.pathname.startsWith('/category/')
    ? location.pathname.split('/').pop()
    : null;

  return (
    <nav className="space-y-1">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Categories
      </div>
      {categories.map((c) => {
        const active = activeSlug === c.slug;
        return (
          <Link
            key={c.slug}
            to={`/category/${c.slug}`}
            onClick={() => onItemClick?.(c.slug)}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition focus-ring-main-gradient ${
              active
                ? 'active-main-gradient text-blue-800 dark:text-blue-200'
                : 'text-slate-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800'
            }`}
          >
            <span>{c.name}</span>
            <svg className="h-4 w-4 opacity-60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        );
      })}
    </nav>
  );
}

export default CategoryList;
