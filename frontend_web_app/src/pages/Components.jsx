import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meta from '../components/common/Meta';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PreviewCanvas from '../components/explorer/PreviewCanvas';
import registry from '../components/registry';
import { getAllComponents } from '../utils/data';
import { copyCodeSnippet } from '../utils/copy';
import { oceanTheme } from '../utils/tokens';
import CodeBlock from '../components/explorer/CodeBlock';
import { initPreline } from '../utils/preline';

/**
 * PUBLIC_INTERFACE
 * ComponentsPage - Renders a page for a given sidebar item slug, listing relevant component examples.
 * Lets the layout's main content area handle scrolling. No extra overflow wrappers here.
 */
function ComponentsPage() {
  const { slug } = useParams();

  const items = useMemo(() => {
    // Strict: show only components whose category exactly matches the active slug.
    if (!slug) return [];
    const all = getAllComponents();
    return all.filter((c) => c.category === slug);
  }, [slug]);

  const pageTitle = useMemo(() => {
    const nice = slug?.replace(/-/g, ' ') ?? 'Components';
    return nice.charAt(0).toUpperCase() + nice.slice(1);
  }, [slug]);

  const [modes, setModes] = useState({}); // id -> 'preview' | 'code'
  const setMode = (id, next) => setModes((m) => ({ ...m, [id]: next }));

  const previewRootRef = useRef(null);

  // Initialize Preline on mount and whenever items/modes change to support data-hs-* previews
  useEffect(() => {
    initPreline();
    if (!previewRootRef.current) return;
    // Execute any inline scripts marked for execution in HTML snippets
    const scripts = previewRootRef.current.querySelectorAll('script[data-inline-execute="true"]');
    scripts.forEach((scriptEl) => {
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function('root', scriptEl.textContent || '');
        fn(previewRootRef.current);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Inline script error in Components preview:', e);
      }
    });

    // Layout splitter wiring for inline HTML snippets on the list page
    const root = previewRootRef.current;
    const containers = Array.from(
      root.querySelectorAll('[data-splitter="horizontal"],[data-splitter="vertical"]')
    );
    const cleanups = [];

    containers.forEach((splitterEl) => {
      const orientation = splitterEl.getAttribute('data-splitter');
      const isHorizontal = orientation === 'horizontal';
      const handles = Array.from(splitterEl.querySelectorAll('[data-splitter-handle]'));

      handles.forEach((handle) => {
        let dragging = false;

        const onMouseMove = (e) => {
          if (!dragging) return;
          const rect = splitterEl.getBoundingClientRect();
          const paneA = handle.previousElementSibling;
          const paneB = handle.nextElementSibling;
          if (!paneA || !paneB) return;

          if (isHorizontal) {
            const x = e.clientX - rect.left;
            const pct = (x / rect.width) * 100;
            const clamped = Math.min(90, Math.max(10, pct));
            paneA.style.width = `${clamped}%`;
            paneA.style.flexBasis = `${clamped}%`;
            paneB.style.width = `${100 - clamped}%`;
            paneB.style.flexBasis = `${100 - clamped}%`;
          } else {
            const y = e.clientY - rect.top;
            const pct = (y / rect.height) * 100;
            const clamped = Math.min(90, Math.max(10, pct));
            splitterEl.style.gridTemplateRows = `${clamped}% auto ${100 - clamped}%`;
          }
        };

        const onMouseUp = () => {
          if (!dragging) return;
          dragging = false;
          document.body.style.userSelect = '';
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseDown = (e) => {
          if (e.button !== 0) return;
          dragging = true;
          document.body.style.userSelect = 'none';
          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
        };

        const onKeyDown = (e) => {
          const paneA = handle.previousElementSibling;
          const paneB = handle.nextElementSibling;
          if (!paneA || !paneB) return;

          if (e.key === 'ArrowLeft' && isHorizontal) {
            e.preventDefault();
            const rect = splitterEl.getBoundingClientRect();
            const currentWidth = paneA.getBoundingClientRect().width;
            const pct = (currentWidth / rect.width) * 100;
            const clamped = Math.min(90, Math.max(10, pct - 2));
            paneA.style.width = `${clamped}%`;
            paneA.style.flexBasis = `${clamped}%`;
            paneB.style.width = `${100 - clamped}%`;
            paneB.style.flexBasis = `${100 - clamped}%`;
          } else if (e.key === 'ArrowRight' && isHorizontal) {
            e.preventDefault();
            const rect = splitterEl.getBoundingClientRect();
            const currentWidth = paneA.getBoundingClientRect().width;
            const pct = (currentWidth / rect.width) * 100;
            const clamped = Math.min(90, Math.max(10, pct + 2));
            paneA.style.width = `${clamped}%`;
            paneA.style.flexBasis = `${clamped}%`;
            paneB.style.width = `${100 - clamped}%`;
            paneB.style.flexBasis = `${100 - clamped}%`;
          } else if (e.key === 'ArrowUp' && !isHorizontal) {
            e.preventDefault();
            const rect = splitterEl.getBoundingClientRect();
            const topH = paneA.getBoundingClientRect().height;
            const pct = (topH / rect.height) * 100;
            const clamped = Math.min(90, Math.max(10, pct + 2));
            splitterEl.style.gridTemplateRows = `${clamped}% auto ${100 - clamped}%`;
          } else if (e.key === 'ArrowDown' && !isHorizontal) {
            e.preventDefault();
            const rect = splitterEl.getBoundingClientRect();
            const topH = paneA.getBoundingClientRect().height;
            const pct = (topH / rect.height) * 100;
            const clamped = Math.min(90, Math.max(10, pct - 2));
            splitterEl.style.gridTemplateRows = `${clamped}% auto ${100 - clamped}%`;
          }
        };

        handle.addEventListener('mousedown', onMouseDown);
        handle.addEventListener('keydown', onKeyDown);

        cleanups.push(() => {
          handle.removeEventListener('mousedown', onMouseDown);
          handle.removeEventListener('keydown', onKeyDown);
        });
      });
    });

    return () => {
      cleanups.forEach((fn) => {
        try { fn(); } catch {}
      });
    };
  }, [items, modes]);

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
    <div className="space-y-6 pb-4" ref={previewRootRef}>
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

          // Compute code snippet priority: raw registry -> item.code -> jsxCode
          const jsxFromJson = item.jsxCode || reg?.exampleCode || '';
          const code = reg?.raw ? reg.raw : item.code ? item.code : jsxFromJson;

          const mode = modes[item.id] || 'preview';

          // Prefer live React component when available; otherwise, if we have HTML code, render it verbatim
          let previewNode;
          if (PreviewComp) {
            previewNode = <PreviewComp {...(reg?.previewProps || item?.previewProps || {})} />;
          } else if (typeof code === 'string' && code.trim().length > 0) {
            // Render HTML snippet directly so users see the real markup rendered
            previewNode = (
              <div
                className="w-full"
                // Intentionally render exact snippet; do not wrap with extra centering that would change code semantics
                dangerouslySetInnerHTML={{ __html: code }}
              />
            );
          } else {
            previewNode = (
              <div
                className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-slate-600 dark:border-gray-700 dark:bg-gray-900/40 dark:text-slate-300"
                role="img"
                aria-label={`${item.name} preview placeholder`}
              >
                Live preview not available. Switch to Code to view snippet.
              </div>
            );
          }

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
                <PreviewCanvas className="bg-background dark:bg-gray-900" title="Live Preview" mode={mode}>
                  {/* Rely on main content scroll; no extra overflow wrapper */}
                  <div>{previewNode}</div>
                </PreviewCanvas>
              ) : (
                // Code panel must show the exact snippet string used for preview/copy
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
