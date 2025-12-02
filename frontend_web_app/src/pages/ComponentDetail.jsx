import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComponentById } from '../utils/data';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PreviewCanvas from '../components/explorer/PreviewCanvas';
import CodeTabs from '../components/explorer/CodeTabs';
import PropControls from '../components/explorer/PropControls';
import { copyCodeSnippet } from '../utils/copy';
import { getPreviewProps } from '../utils/preview';
import Meta from '../components/common/Meta';
import { getComponentSnippet, oceanTheme } from '../utils/tokens';

/**
 * PUBLIC_INTERFACE
 * ComponentDetail shows a preview and code for a given component id using local data.
 */
function ComponentDetail() {
  const { id } = useParams();
  const component = getComponentById(id);

  // Seed local preview state with registry previewProps (non-destructive; basic placeholders)
  const [previewOverrides, setPreviewOverrides] = useState(() => getPreviewProps(id));

  const snippet = useMemo(() => getComponentSnippet(component), [component]);

  // Two-state toggle for Preview | Code
  const [mode, setMode] = useState('preview'); // 'preview' | 'code'

  const handleCopyInCode = async () => {
    await copyCodeSnippet(snippet);
  };

  // Placeholder prop controls representing a simple edit over preview props
  const controls = Object.entries(previewOverrides || {}).map(([key, value]) => {
    if (typeof value === 'string') {
      return { label: key, type: 'text', value };
    }
    return null;
  }).filter(Boolean);

  const handleControlChange = (index, value) => {
    // For now, tie index to key ordering in controls
    const key = controls[index]?.label;
    if (!key) return;
    setPreviewOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const Toggle = () => (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex rounded-md border border-gray-200 bg-white p-0.5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <button
        type="button"
        onClick={() => setMode('preview')}
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
        onClick={() => setMode('code')}
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
          // Note: example only, inline code is stored in local JSON for preview/copy
          sampleType: 'snippet',
        }}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
        <div className="flex shrink-0 items-center gap-2">
          <Toggle />
        </div>
      </div>

      {mode === 'preview' ? (
        <PreviewCanvas
          height={component?.previewHeight || 140}
          componentId={id}
          overrideProps={previewOverrides}
          header={<Toggle />}
        />
      ) : null}

      {mode === 'code' ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
              <div className="flex items-center gap-2 px-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                Code
              </div>
              <div className="px-2">
                <button
                  type="button"
                  onClick={handleCopyInCode}
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-gray-50 focus:outline-none focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  Copy
                </button>
              </div>
            </div>
            <pre className="custom-scrollbar max-h-[420px] overflow-auto bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
              <code>{snippet || '<div />'}</code>
            </pre>
          </div>
          <div className="space-y-4">
            <PropControls controls={controls} onChange={handleControlChange} />
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Details</div>
              {component?.notes ? (
                <p className="text-sm text-slate-700 dark:text-slate-200">{component.notes}</p>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  No additional notes for this component.
                </p>
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
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ComponentDetail;
