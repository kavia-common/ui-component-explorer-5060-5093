import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getFeaturedComponents, getAllComponents } from '../utils/data';
import ComponentGrid from '../components/explorer/ComponentGrid';
import { parseQueryParams } from '../utils/filter';
import { searchComponents } from '../utils/search';
import { filterComponents } from '../utils/filter';

/**
 * PUBLIC_INTERFACE
 * Home page displays a simple hero and sample categories/components grid.
 * Applies query string search/filter to the full list, falling back to featured when no query present.
 */
function Home() {
  const location = useLocation();
  const query = useMemo(() => parseQueryParams(location.search), [location.search]);
  const all = getAllComponents();

  const results = useMemo(() => {
    const hasQuery = (query.q && query.q.trim().length) || (query.tags || []).length || (query.difficulty && query.difficulty.length);
    if (!hasQuery) return null;
    const searched = searchComponents(all, query.q || '');
    return filterComponents(searched, { tags: query.tags, difficulty: query.difficulty });
  }, [all, query]);

  const featured = getFeaturedComponents(6);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-gradient-to-r from-blue-500/10 to-gray-50 p-6 dark:from-blue-500/10 dark:to-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover ready-to-use UI components</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Browse, preview, and copy React + Tailwind components with light/dark support.
        </p>
      </section>

      {results ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Search results</h2>
          <ComponentGrid items={results} />
        </section>
      ) : (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Featured</h2>
          <ComponentGrid items={featured} />
        </section>
      )}
    </div>
  );
}

export default Home;
