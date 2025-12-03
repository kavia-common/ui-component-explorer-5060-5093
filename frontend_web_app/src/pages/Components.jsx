import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meta from '../components/common/Meta';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PreviewCanvas from '../components/explorer/PreviewCanvas';
import registry from '../components/registry';
import { getAllComponents } from '../utils/data';
import { copyCodeSnippet } from '../utils/copy';
import { oceanTheme } from '../utils/tokens';
import CodeBlock from '../components/explorer/CodeBlock';

/**
 * PUBLIC_INTERFACE
 * ComponentsPage - Renders a page for a given sidebar item slug, listing relevant component examples.
 * Lets the layout's main content area handle scrolling. No extra overflow wrappers here.
 */
function ComponentsPage() {
  const { slug } = useParams();

  const items = useMemo(() => {
    const all = getAllComponents();
    if (!slug) return [];

    const exact = all.filter((c) => c.slug === slug);
    if (exact.length) return exact;

    const byCategory = all.filter((c) => c.category === slug);
    if (byCategory.length) return byCategory;

    const lower = slug.toLowerCase();
    const byHeuristic = all.filter(
      (c) =>
        c.slug?.toLowerCase() === lower ||
        c.name?.toLowerCase().includes(lower) ||
        c.tags?.some((t) => String(t).toLowerCase().includes(lower))
    );

    if (lower === 'tables') {
      return all.filter((c) => c.category === 'tables');
    }

    return byHeuristic;
  }, [slug]);

  const pageTitle = useMemo(() => {
    const nice = slug?.replace(/-/g, ' ') ?? 'Components';
    return nice.charAt(0).toUpperCase() + nice.slice(1);
  }, [slug]);

  const [modes, setModes] = useState({}); // id -> 'preview' | 'code'
  const setMode = (id, next) => setModes((m) => ({ ...m, [id]: next }));

  const handleCopy = async (code) => {
    await copyCodeSnippet(code);
  };

  const Toggle = ({ id, mode }) => (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex rounded-md border border-gray-200 bg-white p-0.5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <button
        type="button"
        onClick={() => setMode(id, 'preview')}
        aria-pressed={mode === 'preview'}
        className={`px-3 py-1.5 text-xs font-medium rounded-[6px] focus:outline-none ${oceanTheme.classes.primaryRing} ${
          mode === 'preview'
            ? 'bg-blue-600 text-white'
            : 'text-slate-800 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-gray-700'
        }`}
      >
        Preview
      </button>
      <button
        type="button"
        onClick={() => setMode(id, 'code')}
        aria-pressed={mode === 'code'}
        className={`px-3 py-1.5 text-xs font-medium rounded-[6px] focus:outline-none ${oceanTheme.classes.primaryRing} ${
          mode === 'code'
            ? 'bg-blue-600 text-white'
            : 'text-slate-800 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-gray-700'
        }`}
      >
        Code
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Meta
        title={`${pageTitle} Components`}
        description={`Browse ready-to-use ${pageTitle} components. Live preview and code snippets.`}
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
          const code = reg?.raw ? reg.raw : item.code ? item.code : jsxFromJson;

          const mode = modes[item.id] || 'preview';

          const previewNode = PreviewComp ? (
            <PreviewComp {...(reg?.previewProps || item?.previewProps || {})} />
          ) : (
            <div
              className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-slate-600 dark:border-gray-700 dark:bg-gray-900/40 dark:text-slate-300"
              role="img"
              aria-label={`${item.name} preview placeholder`}
            >
              Live preview not available. Switch to Code to view snippet.
            </div>
          );

          return (
            <section id={item.slug} key={item.id} className="scroll-mt-20 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.name}</h2>
                  {(item.short || item.description) && (
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                      {item.short || item.description}
                    </p>
                  )}
                </div>
                <Toggle id={item.id} mode={mode} />
              </div>

              {mode === 'preview' ? (
                <PreviewCanvas className="bg-white dark:bg-gray-900" title="Live Preview" mode={mode}>
                  {/* Rely on main content scroll; no extra overflow wrapper */}
                  <div>{previewNode}</div>
                </PreviewCanvas>
              ) : (
                <CodeBlock code={code || jsxFromJson || ''} language="jsx" title="Code" />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default ComponentsPage;
