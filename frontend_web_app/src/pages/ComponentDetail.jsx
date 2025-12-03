import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getAllComponents, getComponentById } from '../utils/data';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Meta from '../components/common/Meta';
import { getComponentSnippet } from '../utils/tokens';
import PreviewWithCode from '../components/explorer/PreviewWithCode';
import { getPreviewProps } from '../utils/preview';

// PUBLIC_INTERFACE
/**
 * ComponentDetail
 * Renders the detail page for a single component by id. This page:
 * - Mounts ONLY on /component/:id routes.
 * - Fetches the exact component by id, and renders a single PreviewWithCode.
 * - Does not render related items or lists. No fallback mapping over multiple items.
 */
function ComponentDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const didLogRef = useRef(false);

  // Guard route detection (but don't conditionally call hooks)
  const isDetailRoute = typeof pathname === 'string' && /^\/component\/[^/]+$/.test(pathname);

  // Fetch all components and the specific one
  const allComponents = useMemo(() => getAllComponents(), []);
  const component = useMemo(() => (id ? getComponentById(id) : null), [id]);

  // Diagnostic: log matched count once
  useEffect(() => {
    if (didLogRef.current) return;
    if (typeof window !== 'undefined') {
      const matches = allComponents.filter((c) => c?.id === id);
      // eslint-disable-next-line no-console
      console.log('[ComponentDetail:diagnostic]', { id, matchedCount: matches.length });
      didLogRef.current = true;
    }
  }, [id, allComponents]);

  // Prepare preview controls for single component
  const [previewOverrides, setPreviewOverrides] = useState(() => getPreviewProps(id));
  const snippet = useMemo(() => getComponentSnippet(component), [component]);

  const controls = useMemo(() => {
    const entries = Object.entries(previewOverrides || {});
    return entries
      .map(([key, value]) => (typeof value === 'string' ? { label: key, type: 'text', value } : null))
      .filter(Boolean);
  }, [previewOverrides]);

  const handleControlChange = (index, value) => {
    const key = controls[index]?.label;
    if (!key) return;
    setPreviewOverrides((prev) => ({ ...prev, [key]: value }));
  };

  // Hard guard: only on /component routes
  if (!isDetailRoute) {
    return null;
  }

  // Not found handling
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

  // Duplicate id defense (should not happen if data validated)
  const dupCount = allComponents.reduce((acc, c) => (c?.id === id ? acc + 1 : acc), 0);
  if (dupCount > 1) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Components', to: '/' }]} />
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-6 text-center text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200">
          Multiple components found with id <span className="font-mono">{id}</span>. Please ensure unique ids.
        </div>
      </div>
    );
  }

  // Render only the selected component
  return (
    <div className="space-y-6 pb-4">
      <Meta
        title={component?.name || id}
        description={component?.description || 'Preview and copy code for this component.'}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/component/${encodeURIComponent(id)}` : undefined}
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
            url: typeof window !== 'undefined' ? window.location.origin : undefined,
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
      />
    </div>
  );
}

export default ComponentDetail;
