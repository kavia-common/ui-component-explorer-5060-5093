import React, { useState, useEffect } from 'react';
import Badge from '../common/Badge';
import Icon from '../common/Icon';

/**
 * PUBLIC_INTERFACE
 * Filters - Simple filter panel.
 * Props:
 * - allTags: string[]
 * - onChange: ({ q: string, tags: string[] }) => void
 * - initial?: { q?: string, tags?: string[] }
 */
function Filters({ allTags = [], onChange, initial }) {
  const [q, setQ] = useState(initial?.q || '');
  const [tags, setTags] = useState(initial?.tags || []);

  useEffect(() => {
    onChange?.({ q, tags });
  }, [q, tags]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTag = (t) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Icon name="adjustments" className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Filters</div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or tag…"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
          />
        </div>
      </div>
      {allTags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allTags.map((t) => {
            const active = tags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className="focus:outline-none"
                type="button"
              >
                <Badge color={active ? 'blue' : 'gray'}>{t}</Badge>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Filters;
