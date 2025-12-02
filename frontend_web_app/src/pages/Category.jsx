import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComponentsByCategory, getCategories } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * Category page shows components for a given category slug.
 */
function Category() {
  const { slug } = useParams();

  const items = getComponentsByCategory(slug);
  const category = getCategories().find((c) => c.slug === slug);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold capitalize text-gray-900 dark:text-white">
          {category?.name || slug}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {category?.description || `Browse components in the ${slug} category.`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/component/${encodeURIComponent(item.id)}`}
            className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
          >
            <div className="mb-2 h-28 rounded-md bg-gray-50 transition group-hover:bg-blue-50 dark:bg-gray-900/40 dark:group-hover:bg-blue-900/20" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800 group-hover:text-blue-700 dark:text-gray-200 dark:group-hover:text-blue-300">
                {item.name}
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-400">View</span>
            </div>
          </Link>
        ))}

        {items.length === 0 && (
          <div className="rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
            No components found for this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
