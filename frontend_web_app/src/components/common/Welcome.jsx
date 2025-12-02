import React from 'react';
import { Link } from 'react-router-dom';
import Meta from './Meta';
import Button from './Button';
import Breadcrumbs from './Breadcrumbs';
import { getCategories } from '../../utils/data';

/**
 * PUBLIC_INTERFACE
 * Welcome - Landing page hero and quick-start navigation.
 * Keeps the page focused on intro and navigation only (no component previews).
 */
function Welcome() {
  const categories = getCategories().slice(0, 6);

  return (
    <div className="space-y-8">
      <Meta
        title="Welcome"
        description="Welcome to the UI Component Explorer. Browse, preview, and copy React + Tailwind components. Jump into categories via the sidebar or shortcuts."
        canonical={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
      />

      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[{ label: 'Welcome' }]} />
        <section
          aria-labelledby="welcome-heading"
          className="rounded-xl bg-gradient-to-b from-blue-500/10 to-gray-50 p-6 dark:from-blue-500/10 dark:to-gray-900"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h1 id="welcome-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Build faster with ready-to-use UI components
              </h1>
              <p className="mt-2 text-slate-700 dark:text-slate-200">
                Explore a curated library of React + Tailwind components. Use the sidebar to pick a category and dive
                into live previews with one-click copy.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/?q=" className="focus:outline-none">
                <Button variant="primary" size="md" aria-label="Browse all components">
                  Browse Components
                </Button>
              </Link>
              <Link to="/category/buttons" className="focus:outline-none">
                <Button variant="secondary" size="md" aria-label="View popular categories">
                  Popular Categories
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Category shortcuts only; no component showcases on the home page */}
      <section aria-labelledby="featured-categories-heading" className="space-y-4">
        <h2 id="featured-categories-heading" className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Categories
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="group block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md focus:outline-none focus-ring-main-gradient dark:border-gray-800 dark:bg-gray-900"
              aria-label={`Browse ${c.name} components`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:underline dark:text-slate-100">
                    {c.name}
                  </h3>
                  {c.description ? (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.description}</p>
                  ) : null}
                </div>
                <div className="rounded-md bg-main-gradient p-2 text-white shadow-sm">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Welcome;
