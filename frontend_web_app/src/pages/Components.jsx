import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meta from '../components/common/Meta';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CodeTabs from '../components/explorer/CodeTabs';
import PreviewCanvas from '../components/explorer/PreviewCanvas';
import registry from '../components/registry';
import { getAllComponents } from '../utils/data';
import { copyCodeSnippet } from '../utils/copy';

/**
 * PUBLIC_INTERFACE
 * ComponentsPage - Renders a page for a given sidebar item slug, listing relevant component examples.
 * - URL: /category/:slug
 * - For each component: title, description, live preview, and Copy Code functionality.
 * - Reads component metadata from local JSON (components.json) and uses the registry for live render when possible.
 */
function ComponentsPage() {
  const { slug } = useParams();
  const [copyState, setCopyState] = useState({}); // id -> copied boolean

  // Map sidebar slug to matching components. We match by slug or category or tag occurrences.
  const items = useMemo(() => {
    const all = getAllComponents();
    if (!slug) return [];

    // Prefer exact slug match
    const exact = all.filter((c) => c.slug === slug);
    if (exact.length) return exact;

    // If slug matches known category keys
    const byCategory = all.filter((c) => c.category === slug);
    if (byCategory.length) return byCategory;

    // Fallback: tag/slug containment heuristics
    const lower = slug.toLowerCase();
    const byHeuristic = all.filter(
      (c) =>
        c.slug?.toLowerCase() === lower ||
        c.name?.toLowerCase().includes(lower) ||
        c.tags?.some((t) => String(t).toLowerCase().includes(lower))
    );

    // As another fallback for "tables" that groups multiple entries
    if (lower === 'tables') {
      return all.filter((c) => c.category === 'tables');
    }

    return byHeuristic;
  }, [slug]);

  const pageTitle = useMemo(() => {
    const nice = slug?.replace(/-/g, ' ') ?? 'Components';
    return nice.charAt(0).toUpperCase() + nice.slice(1);
  }, [slug]);

  const handleCopy = async (id, code) => {
    const ok = await copyCodeSnippet(code);
    if (ok) {
      setCopyState((s) => ({ ...s, [id]: true }));
      setTimeout(() => setCopyState((s) => ({ ...s, [id]: false })), 1200);
    }
  };

  return (
    <div className="space-y-6">
      <Meta
        title={`${pageTitle} Components`}
        description={`Browse ready-to-use ${pageTitle} components. Live preview and copy JSX/Tailwind snippets.`}
      />
      <Breadcrumbs items={[{ label: 'Components', to: '/' }, { label: pageTitle }]} />

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-600 dark:text-slate-300 dark:border-slate-700">
          No components found for “{pageTitle}”.
        </div>
      ) : null}

      <div className="space-y-8">
        {items.map((item) => {
          const reg = registry[item.id];
          const PreviewComp = reg?.component;

          const jsxFromJson = item.jsxCode || reg?.exampleCode || '';
          const code = reg?.raw
            ? reg.raw
            : item.code
            ? item.code
            : jsxFromJson;

          // Build preview node
          const previewNode = PreviewComp ? (
            <PreviewComp {...(reg?.previewProps || item?.previewProps || {})} />
          ) : (
            // Fallback: if no live component in registry, show a static block
            <div
              className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-slate-600 dark:border-gray-700 dark:bg-gray-900/40 dark:text-slate-300"
              role="img"
              aria-label={`${item.name} preview placeholder`}
            >
              Live preview not available. Use the code snippet below.
            </div>
          );

          return (
            <section id={item.slug} key={item.id} className="scroll-mt-20 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.name}</h2>
                  {item.short || item.description ? (
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                      {item.short || item.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, code || jsxFromJson || '')}
                  className="rounded-md border px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                  aria-label={`Copy ${item.name} code`}
                  title={copyState[item.id] ? 'Copied' : 'Copy code'}
                >
                  {copyState[item.id] ? 'Copied' : 'Copy'}
                </button>
              </div>

              <PreviewCanvas className="bg-white dark:bg-gray-900">
                {previewNode}
              </PreviewCanvas>

              <CodeTabs code={code || jsxFromJson || ''} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default ComponentsPage;
