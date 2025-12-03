import React, { useEffect, useMemo, useRef, useState } from 'react';
import PreviewCanvas from './PreviewCanvas';
import CodeBlock from './CodeBlock';
import PropControls from './PropControls';
import { getPreviewComponent } from '../../utils/preview';
import { initPreline, usePreline } from '../../utils/preline';

/**
 * PUBLIC_INTERFACE
 * PreviewWithCode - Combined live preview and code viewer for a single registry component id.
 * Does not impose its own overflow on the top container; the page main content handles scrolling.
 * Props:
 * - componentId: string (required)
 * - overrideProps: object
 * - code: string
 * - title: string
 * - height: number|string
 * - controls: array
 * - onControlChange: function(index:number, value:any) -> void
 * - detailsPanel: ReactNode
 */
function PreviewWithCode({
  componentId,
  overrideProps = {},
  code = '',
  title = 'Live Preview',
  height = 200,
  controls = [],
  onControlChange,
  detailsPanel,
}) {
  const [mode, setMode] = useState('preview'); // 'preview' | 'code'
  const containerRef = useRef(null);

  const PreviewComp = useMemo(() => getPreviewComponent(componentId), [componentId]);

  // If a code snippet is provided, we can render it verbatim as HTML in preview when applicable.
  const hasHtmlSnippet = typeof code === 'string' && code.trim().length > 0;

  usePreline([mode, componentId, code]);

  useEffect(() => {
    if (!containerRef.current) return;
    initPreline();
    const scripts = containerRef.current.querySelectorAll('script[data-inline-execute="true"]');
    scripts.forEach((scriptEl) => {
      try {
        const fn = new Function('root', scriptEl.textContent || '');
        fn(containerRef.current);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Inline script error in preview:', e);
      }
    });
  }, [mode, componentId, code]);

  const minHeightStyle =
    typeof height === 'number'
      ? { minHeight: `${height}px` }
      : typeof height === 'string'
      ? { minHeight: height }
      : { minHeight: '200px' };

  // Render raw HTML snippet exactly as provided inside a container, without additional wrappers
  const HTMLPreview = useMemo(() => {
    if (!hasHtmlSnippet) return null;
    // Return a component that injects the snippet directly
    // We keep a minimal wrapper to control minHeight and centering is left to the snippet itself
    // so the code matches what is copied.
    // We do not pretty-print or alter whitespace.
    // For security, assume local snippets; the app is sandboxed for this explorer.
    // eslint-disable-next-line react/display-name
    return () => (
      <div
        // Apply minHeight so canvas has space but do not inject extra centering
        style={minHeightStyle}
        className="w-full"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  }, [hasHtmlSnippet, code, minHeightStyle]);

  if (!componentId) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-600 dark:text-slate-300 dark:border-slate-700">
        Missing component id.
      </div>
    );
  }

  return (
    <section className="space-y-4" ref={containerRef}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <div
          role="group"
          aria-label="View mode"
          className="inline-flex rounded-md border border-gray-200 bg-white p-0.5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <button
            type="button"
            onClick={() => setMode('preview')}
            aria-pressed={mode === 'preview'}
            className={`px-3 py-1.5 text-xs font-medium rounded-[6px] focus:outline-none ${
              mode === 'preview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-800 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-gray-700'
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setMode('code')}
            aria-pressed={mode === 'code'}
            className={`px-3 py-1.5 text-xs font-medium rounded-[6px] focus:outline-none ${
              mode === 'code'
                ? 'bg-blue-600 text-white'
                : 'text-slate-800 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-gray-700'
            }`}
          >
            Code
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          {mode === 'preview' ? (
            <PreviewCanvas className="bg-white dark:bg-gray-900" title={title} mode={mode}>
              {hasHtmlSnippet ? (
                <HTMLPreview />
              ) : (
                // Component-driven preview
                <div style={minHeightStyle} className="flex items-center justify-center">
                  <PreviewComp {...overrideProps} />
                </div>
              )}
            </PreviewCanvas>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-0 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <CodeBlock code={code || ''} language="jsx" title="Code" />
            </div>
          )}
        </div>

        <div className="md:col-span-4 space-y-4 min-h-0">
          {Array.isArray(controls) && controls.length > 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 p-3 text-sm font-medium text-slate-800 dark:border-gray-800 dark:text-slate-100">
                Controls
              </div>
              <PropControls controls={controls} onChange={onControlChange} />
            </div>
          ) : null}

          {detailsPanel ? (
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              {detailsPanel}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default PreviewWithCode;
