import React from "react";

/**
 * Breadcrumb sample with separators.
 */
const BreadcrumbNav = ({ items = ["Home", "Library", "Data"] }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
        {items.map((item, idx) => (
          <li key={item} className="flex items-center">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {item}
            </a>
            {idx < items.length - 1 && (
              <svg className="mx-2 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.05 4.55L5.64 5.96 9.68 10l-4.04 4.04 1.41 1.41L12.5 10 7.05 4.55z" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
