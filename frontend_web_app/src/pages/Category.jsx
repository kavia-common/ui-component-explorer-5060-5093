import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComponentsByCategory, getCategories } from '../utils/data';
import Filters from '../components/explorer/Filters';
import ComponentGrid from '../components/explorer/ComponentGrid';
import EmptyState from '../components/common/EmptyState';
import Breadcrumbs from '../components/common/Breadcrumbs';

/**
 * PUBLIC_INTERFACE
 * Category page shows components for a given category slug.
 */
function Category() {
  const { slug } = useParams();

  const baseItems = getComponentsByCategory(slug);
  const category = getCategories().find((c) => c.slug === slug);

  const allTags = useMemo(() => {
    const s = new Set();
    baseItems.forEach((i) => (i.tags || []).forEach((t) => s.add(t)));
    return Array.from(s);
  }, [baseItems]);

  const [filter, setFilter] = useState({ q: '', tags: [] });

  const filtered = useMemo(() => {
    const q = (filter.q || '').toLowerCase();
    const tags = filter.tags || [];
    return baseItems.filter((it) => {
      const nameOk = !q || it.name.toLowerCase().includes(q);
      const tagOk =
        !q ||
        (it.tags || []).some((t) => t.toLowerCase().includes(q));
      const tagsAllOk =
        !tags.length || tags.every((t) => (it.tags || []).includes(t));
      return (nameOk || tagOk) && tagsAllOk;
    });
  }, [baseItems, filter]);

  return (
    <div className="space-y-6">
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

      <Filters allTags={allTags} onChange={setFilter} />

      <ComponentGrid
        items={filtered}
        empty={
          <EmptyState
            title="No components match your filters"
            description="Try clearing search or deselecting some tags."
          />
        }
      />
    </div>
  );
}

export default Category;
