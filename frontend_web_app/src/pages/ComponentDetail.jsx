import React, { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getComponentById } from '../utils/data';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Meta from '../components/common/Meta';
import { getComponentSnippet } from '../utils/tokens';
import PreviewWithCode from '../components/explorer/PreviewWithCode';
import { getPreviewProps } from '../utils/preview';

/**
 * PUBLIC_INTERFACE
 * ComponentDetail shows a preview and code for a given component id using local data.
 * Allows the page-level main content wrapper to control vertical scrolling.
 */
/**
 * PUBLIC_INTERFACE
 * ComponentDetail
 * Renders a single component detail page for route /component/:id.
 * - Fetches exactly one component by id (from components.json) using getComponentById.
 * - Renders a single PreviewWithCode instance for that component only.
 * - No related or multi-item rendering occurs here.
 * Route params:
 *   id: string - unique component id
 * Returns:
 *   React element for the detail page; shows a not-found message when id invalid.
 */
function ComponentDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();

  // Compute guard first, but do not return before hooks are declared
  const isDetailRoute = /^\/component\/[^/]+$/.test(pathname || '');

  // Fetch the single component by id
  const component = getComponentById(id);

  // Diagnostics: instrument to ensure correct matching (TEMP - remove after verification)
  if (typeof window !== 'undefined') {
    const matchedLen = component ? 1 : 0;
    // eslint-disable-next-line no-console
    console.log('[ComponentDetail] detail check => id:', id, 'matchedLen:', matchedLen);
  }

  // Local preview overrides (basic control demo)
  const [previewOverrides, setPreviewOverrides] = useState(() => getPreviewProps(id));
  const snippet = useMemo(() => getComponentSnippet(component), [component]);

  // If not on the exact detail route, render nothing (after hooks have been called)
  if (!isDetailRoute) {
    return null;
  }

  // Friendly fallback if id is missing or component not found
  if (!id || !component) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Components', to: '/' }]} />
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-600 dark:text-slate-300 dark:border-slate-700">
          Component not found for id: <span className="font-mono">{id || '(missing)'}</span>
        </div>
      </div>
    );
  }

  const controls = Object.entries(previewOverrides || {})
    .map(([key, value]) => {
      if (typeof value === 'string') return { label: key, type: 'text', value };
      return null;
    })
    .filter(Boolean);

  const handleControlChange = (index, value) => {
    const key = controls[index]?.label;
    if (!key) return;
    setPreviewOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const detailsPanel = (
    <div className="p-4">
      <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Details</div>
      {component?.notes ? (
        <p className="text-sm text-slate-700 dark:text-slate-200">{component.notes}</p>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-300">No additional notes for this component.</p>
      )}
      {Array.isArray(component?.libraries) && component.libraries.length > 0 ? (
        <div className="mt-3">
          <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Libraries</div>
          <ul className="mt-1 space-y-1">
            {component.libraries.map((lib, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-mono">{lib.name}</span>
                {lib.install ? (
                  <>
                    {' '}• Install: <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-900">{lib.install}</code>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );

  // Render a single item preview exactly once
  return (
    <div className="space-y-6 pb-4">
      <Meta
        title={component?.name || id}
        description={component?.description || 'Preview and copy code for this component.'}
        canonical={
          typeof window !== 'undefined' ? `${window.location.origin}/component/${encodeURIComponent(id)}` : undefined
        }
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: component?.name || id,
          description: component?.description || 'Preview and copy code for this component.',
          codeRepository: typeof window !== 'undefined' ? window.location.origin : undefined,
          codeSampleType: 'text',
          programmingLanguage: 'JavaScript',
          runtimePlatform: 'React',
          author: {
            '@type': 'Organization',
            name: 'UI Component Explorer',
            url: typeof window !== 'undefined' ? window.location.origin : undefined
          },
          sampleType: 'snippet',
        }}
      />
      <div className="space-y-2">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Components', to: '/' },
            { label: component?.name || id },
          ]}
        />
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{component?.name || id}</h1>
        <p className="text-slate-700 dark:text-slate-200">
          {component?.description || 'Preview and copy code for this component.'}
        </p>
      </div>

      <PreviewWithCode
        componentId={id}
        overrideProps={previewOverrides}
        code={snippet}
        title="Live Preview"
        height={component?.previewHeight || 140}
        controls={controls}
        onControlChange={handleControlChange}
        detailsPanel={detailsPanel}
      />
    </div>
  );
}

export default ComponentDetail;
