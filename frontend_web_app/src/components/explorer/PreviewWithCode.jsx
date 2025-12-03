import React, { useEffect, useMemo, useRef, useState } from 'react';
import PreviewCanvas from './PreviewCanvas';
import CodeBlock from './CodeBlock';
import PropControls from './PropControls';
import { getPreviewComponent } from '../../utils/preview';
import { initPreline, usePreline } from '../../utils/preline';

/**
 * PUBLIC_INTERFACE
 * PreviewWithCode - Combined live preview and code viewer for a single registry component id.
 * Props:
 * - componentId: string (required) - registry id for the component to preview
 * - overrideProps: object - props to pass into the preview component (merged over registry defaults)
 * - code: string - code snippet to display in the code panel
 * - title: string - title for the preview panel
 * - height: number|string - the min height for preview area
 * - controls: array - control descriptors for PropControls
 * - onControlChange: function(index:number, value:any) -> void
 * - detailsPanel: ReactNode - Optional right-side details panel
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

  // Resolve component from registry; fallback is a placeholder safe component
  const PreviewComp = useMemo(() => getPreviewComponent(componentId), [componentId]);

  // Ensure Preline init runs after the DOM updates with potentially data-hs-* markup
  // This also guards for SSR/non-browser environments.
  usePreline([mode, componentId, code]);

  // Execute inline scripts that are part of the rendered snippet (scoped to this preview)
  useEffect(() => {
    if (!containerRef.current) return;
    // Re-init Preline first to wire data-hs-* attributes
    initPreline();
    // Find and run inline scripts within the preview only
    const scripts = containerRef.current.querySelectorAll('script[data-inline-execute="true"]');
    scripts.forEach((scriptEl) => {
      try {
        // Create a new Function with limited local scope, passing the preview root for scoping queries
        const fn = new Function('root', scriptEl.textContent || '');
        fn(containerRef.current);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Inline script error in preview:', e);
      }
    });
  }, [mode, componentId, code]);

  // Guard numeric/string height
  const minHeightStyle =
    typeof height === 'number' ? { minHeight: `${height}px` } :
    typeof height === 'string' ? { minHeight: height } :
    { minHeight: '200px' };

  // If id is missing, render a friendly fallback
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
        <div role="group" aria-label="View mode" className="inline-flex rounded-md border border-gray-200 bg-white p-0.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
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
              <div style={minHeightStyle} className="flex items-center justify-center">
                <PreviewComp {...overrideProps} />
              </div>
            </PreviewCanvas>
          ) : (
            <CodeBlock code={code || ''} language="jsx" title="Code" />
          )}
        </div>

        <div className="md:col-span-4 space-y-4">
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
