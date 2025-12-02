import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComponentById } from '../utils/data';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PreviewCanvas from '../components/explorer/PreviewCanvas';
import CodeTabs from '../components/explorer/CodeTabs';
import PropControls from '../components/explorer/PropControls';
import Button from '../components/common/Button';
import Icon from '../components/common/Icon';
import { copyCodeSnippet } from '../utils/copy';
import { getPreviewProps } from '../utils/preview';
import Meta from '../components/common/Meta';

/**
 * PUBLIC_INTERFACE
 * ComponentDetail shows a preview and code for a given component id using local data.
 */
function ComponentDetail() {
  const { id } = useParams();
  const component = getComponentById(id);

  // Seed local preview state with registry previewProps (non-destructive; basic placeholders)
  const [previewOverrides, setPreviewOverrides] = useState(() => getPreviewProps(id));

  const copyCode = async () => {
    await copyCodeSnippet(component?.code || '');
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
          <Button onClick={copyCode}>
            <Icon name="copy" /> Copy Code
          </Button>
        </div>
      </div>

      <PreviewCanvas
        height={component?.previewHeight || 140}
        componentId={id}
        overrideProps={previewOverrides}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <CodeTabs code={component?.code || ''} />
        <PropControls controls={controls} onChange={handleControlChange} />
      </div>
    </div>
  );
}

export default ComponentDetail;
