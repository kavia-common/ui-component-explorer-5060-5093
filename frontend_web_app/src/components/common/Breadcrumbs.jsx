import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Breadcrumbs - Render breadcrumb navigation.
 * Props:
 * - items: Array<{ label: string, to?: string }>
 *   If 'to' absent, rendered as current item.
 */
function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-300">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.to ? (
              <Link
                to={item.to}
                className="text-blue-50 underline decoration-1 underline-offset-2 focus-ring-main-gradient rounded-[3px] md:text-blue-600 dark:md:text-blue-300 md:no-underline md:hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-900 dark:text-slate-100">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
