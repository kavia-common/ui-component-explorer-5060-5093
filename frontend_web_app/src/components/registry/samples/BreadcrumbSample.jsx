import React from 'react';

/**
 * PUBLIC_INTERFACE
 * BreadcrumbSample - simple breadcrumb trail
 * Props:
 * - items: Array<{ label: string }>
 */
function BreadcrumbSample({ items = [{ label: 'Home' }, { label: 'Library' }, { label: 'Data' }] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-300">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <span className="hover:text-blue-600 dark:hover:text-blue-400">{item.label}</span>
            {idx < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadcrumbSample;
