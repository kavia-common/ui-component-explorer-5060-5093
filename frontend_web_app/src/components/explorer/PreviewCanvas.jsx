import React from 'react';
import { getPreviewComponent, getPreviewProps } from '../../utils/preview';

/**
 * PUBLIC_INTERFACE
 * PreviewCanvas - Container for component live preview area.
 * Props:
 * - height?: number
 * - componentId?: string (registry key to render)
 * - overrideProps?: object (merge over registry preview/default props)
 * - note?: string (footnote or helper)
 * - children?: ReactNode (if provided, takes precedence over registry)
 */
function PreviewCanvas({ height = 140, componentId, overrideProps, note, children }) {
  const Container = ({ children: c }) => (
    <div
      className="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gradient-to-b from-blue-500/10 to-gray-50 p-4 dark:border-gray-700 dark:from-blue-500/10 dark:to-gray-900"
      style={{ minHeight: `${height}px` }}
    >
      <div className="w-full">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-center">{c}</div>
      </div>
    </div>
  );

  let content = children;
  if (!content && componentId) {
    const Comp = getPreviewComponent(componentId);
    const previewProps = { ...getPreviewProps(componentId), ...(overrideProps || {}) };
    content = <Comp {...previewProps} />;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Live Preview</div>
      <Container>
        {content || (
          <span className="text-xs text-slate-600 dark:text-slate-300">Preview area</span>
        )}
      </Container>
      {note && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{note}</div>}
    </div>
  );
}

export default PreviewCanvas;
