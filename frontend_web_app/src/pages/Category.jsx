import React, { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getComponentsByCategory, getCategories } from '../utils/data';
import Filters from '../components/explorer/Filters';
import ComponentGrid from '../components/explorer/ComponentGrid';
import EmptyState from '../components/common/EmptyState';
import Meta from '../components/common/Meta';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { parseQueryParams } from '../utils/filter';
import { searchComponents } from '../utils/search';
import { filterComponents } from '../utils/filter';

/**
 * PUBLIC_INTERFACE
 * Category page shows components for a given category slug.
 */
function Category() {
  const { slug } = useParams();
  const location = useLocation();

  const baseItems = getComponentsByCategory(slug);
  const category = getCategories().find((c) => c.slug === slug);

  const allTags = useMemo(() => {
    const s = new Set();
    baseItems.forEach((i) => (i.tags || []).forEach((t) => s.add(t)));
    return Array.from(s);
  }, [baseItems]);

  const query = useMemo(() => parseQueryParams(location.search), [location.search]);

  const filtered = useMemo(() => {
    const searched = searchComponents(baseItems, query.q || '');
    return filterComponents(searched, { tags: query.tags, difficulty: query.difficulty });
  }, [baseItems, query]);

  return (
    <div className="space-y-6">
      <Meta
        title={`${category?.name || slug} category`}
        description={category?.description || `Browse components in the ${slug} category.`}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/category/${slug}` : undefined}
      />
      <div className="space-y-2">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Categories', to: '/' },
            { label: category?.name || slug },
          ]}
        />
        <h1 className="text-2xl font-semibold capitalize text-gray-900 dark:text-white">
          {category?.name || slug}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {category?.description || `Browse components in the ${slug} category.`}
        </p>
      </div>

      <Filters allTags={allTags} />

      <ComponentGrid
        items={filtered}
        empty={
          <EmptyState
            title="No components match your filters"
            description="Try clearing the search, changing difficulty, or deselecting some tags."
          />
        }
      />
    </div>
  );
}

export default Category;
