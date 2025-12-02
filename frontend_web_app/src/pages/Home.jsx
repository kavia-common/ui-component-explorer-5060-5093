import React from 'react';
import { getFeaturedComponents } from '../utils/data';
import ComponentGrid from '../components/explorer/ComponentGrid';

/**
 * PUBLIC_INTERFACE
 * Home page displays a simple hero and sample categories/components grid.
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
        <ComponentGrid items={featured} />
      </section>
    </div>
  );
}

export default Home;
