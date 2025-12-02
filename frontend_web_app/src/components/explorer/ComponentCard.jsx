import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Icon from '../common/Icon';

/**
 * PUBLIC_INTERFACE
 * ComponentCard - Card showing a small preview area, title, and tags.
 * Props:
 * - item: { id, name, tags?: string[], previewHeight?: number }
 */
function ComponentCard({ item }) {
  const height = item?.previewHeight ? Math.max(64, item.previewHeight) : 96;
  return (
    <Link
      to={`/component/${encodeURIComponent(item.id)}`}
      className="group block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
    >
      <div
        className="mb-3 flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 transition group-hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900/40 dark:group-hover:bg-blue-900/20"
        style={{ height }}
      >
        <span className="text-xs text-gray-500 dark:text-gray-400">Preview</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium text-gray-800 group-hover:text-blue-700 dark:text-gray-200 dark:group-hover:text-blue-300">
            {item.name}
          </div>
          {item.tags?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((t) => (
                <Badge key={t} color="gray">{t}</Badge>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-0.5 text-blue-600 opacity-0 transition group-hover:opacity-100 dark:text-blue-400">
          <Icon name="arrow-right" />
        </div>
      </div>
    </Link>
  );
}

export default ComponentCard;
