import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedComponents } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * Home page displays a simple hero and sample categories/components grid placeholder.
 */
function Home() {
  const featured = getFeaturedComponents(6);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-gradient-to-r from-blue-500/10 to-gray-50 p-6 dark:from-blue-500/10 dark:to-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover ready-to-use UI components</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Browse, preview, and copy React + Tailwind components with light/dark support.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Featured</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <Link
              key={c.id}
              to={`/component/${encodeURIComponent(c.id)}`}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="mb-2 h-28 rounded-md bg-gray-50 transition group-hover:bg-blue-50 dark:bg-gray-900/40 dark:group-hover:bg-blue-900/20" />
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 group-hover:text-blue-700 dark:text-gray-200 dark:group-hover:text-blue-300">
                  {c.name}
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400">View</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
