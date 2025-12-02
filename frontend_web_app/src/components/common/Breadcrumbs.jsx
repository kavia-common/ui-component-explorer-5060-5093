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
      <ol className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-300">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.to ? (
              <Link
                to={item.to}
                className="text-main-gradient-link focus-ring-main-gradient rounded-[3px] hover:opacity-90"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
