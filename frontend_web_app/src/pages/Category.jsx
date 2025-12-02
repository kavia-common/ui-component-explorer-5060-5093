import React, { useEffect, useMemo } from 'react';
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
import { getItemMetaBySlug, getGroupForItem } from '../utils/sidebar';

/**
 * PUBLIC_INTERFACE
 * Category page shows components for a given category slug.
 * Now supports sidebar item slugs for placeholders:
 * - If no components exist for this slug, show a placeholder page using sidebar metadata (label, blurb).
 */
function Category() {
  const { slug } = useParams();
  const location = useLocation();

  const baseItems = getComponentsByCategory(slug);
  const category = getCategories().find((c) => c.slug === slug);

  // Sidebar mapping for label/blurbs when slug is from sidebar items
  const itemMeta = useMemo(() => getItemMetaBySlug(slug), [slug]);
  const groupMeta = useMemo(() => getGroupForItem(slug), [slug]);

  const titleText = itemMeta?.label || category?.name || slug;
  const descText =
    itemMeta?.blurb ||
    category?.description ||
    `Browse components in the ${titleText} section.`;

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

  // When hash changes, scroll to that anchor if present (for anchor-based filters/sections)
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const isPlaceholder = baseItems.length === 0;

  return (
    <div className="space-y-6">
      <Meta
        title={`${titleText} ${isPlaceholder ? 'section' : 'category'}`}
        description={descText}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/category/${slug}` : undefined}
      />
      <div className="space-y-2">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            groupMeta?.group ? { label: groupMeta.group, to: '/' } : { label: 'Categories', to: '/' },
            { label: titleText },
          ]}
        />
        <div className="rounded-lg p-4 bg-gradient-to-b from-blue-500/10 to-gray-50 dark:from-blue-500/10 dark:to-gray-900">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {titleText}
          </h1>
          <p className="mt-1 text-slate-700 dark:text-slate-200">
            {descText}
          </p>
        </div>
      </div>

      {isPlaceholder ? (
        <EmptyState
          title="Coming soon"
          description="This section doesn’t have components yet. Check back later or explore other categories."
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Category;
