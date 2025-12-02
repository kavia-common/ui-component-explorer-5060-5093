import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getFeaturedComponents, getAllComponents } from '../utils/data';
import ComponentGrid from '../components/explorer/ComponentGrid';
import Meta from '../components/common/Meta';
import { parseQueryParams } from '../utils/filter';
import { searchComponents } from '../utils/search';
import { filterComponents } from '../utils/filter';
import EmptyState from '../components/common/EmptyState';

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
      <Meta
        title="Home"
        description="Discover, preview, and copy React + Tailwind UI components. Search by category or tags with live previews."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
      />
      <section className="rounded-lg bg-gradient-to-r from-blue-500/10 to-gray-50 p-6 dark:from-blue-500/10 dark:to-gray-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Discover ready-to-use UI components</h1>
        <p className="mt-1 text-slate-700 dark:text-slate-200">
          Browse, preview, and copy React + Tailwind components with light/dark support.
        </p>
      </section>

      {results ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Search results</h2>
          <ComponentGrid
            items={results}
            empty={<EmptyState title="No results" description="Try a different search or clear filters." />}
          />
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
