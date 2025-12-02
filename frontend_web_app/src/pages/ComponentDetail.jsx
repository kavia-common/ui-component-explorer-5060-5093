import React from 'react';
import { useParams } from 'react-router-dom';
import { getComponentById } from '../utils/data';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PreviewCanvas from '../components/explorer/PreviewCanvas';
import CodeTabs from '../components/explorer/CodeTabs';
import PropControls from '../components/explorer/PropControls';
import Button from '../components/common/Button';
import Icon from '../components/common/Icon';

/**
 * PUBLIC_INTERFACE
 * ComponentDetail shows a preview and code for a given component id using local data.
 */
function ComponentDetail() {
  const { id } = useParams();
  const component = getComponentById(id);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(component?.code || '');
    } catch {
      // ignore
    }
  };

  // Placeholder prop controls (non-functional preview for now)
  const controls = [
    { label: 'Label', type: 'text', value: 'Primary' },
    { label: 'Variant', type: 'select', value: 'primary', options: ['primary', 'secondary'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Components', to: '/' },
              { label: component?.name || id },
            ]}
          />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{component?.name || id}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {component?.description || 'Preview and copy code for this component.'}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button onClick={copyCode}>
            <Icon name="copy" /> Copy Code
          </Button>
        </div>
      </div>

      <PreviewCanvas height={component?.previewHeight || 140} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <CodeTabs code={component?.code || ''} />
        <PropControls controls={controls} onChange={() => {}} />
      </div>
    </div>
  );
}

export default ComponentDetail;
