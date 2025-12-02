import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';
import Icon from '../common/Icon';
import { parseQueryParams, buildQueryString } from '../../utils/filter';

/**
 * PUBLIC_INTERFACE
 * Filters - Simple filter panel synced with URL query params.
 * Props:
 * - allTags: string[]
 */
function Filters({ allTags = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = useMemo(() => parseQueryParams(location.search), [location.search]);

  const [q, setQ] = useState(initial.q || '');
  const [tags, setTags] = useState(initial.tags || []);
  const [difficulty, setDifficulty] = useState(initial.difficulty || '');

  // keep internal when url changes
  useEffect(() => {
    setQ(initial.q || '');
    setTags(initial.tags || []);
    setDifficulty(initial.difficulty || '');
  }, [initial.q, initial.tags, initial.difficulty]);

  // debounce push to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      const curr = parseQueryParams(location.search);
      const nextQS = buildQueryString({ ...curr, q, tags, difficulty });
      if (`?${new URLSearchParams(location.search).toString()}` !== nextQS) {
        navigate({ pathname: location.pathname, search: nextQS }, { replace: true });
      }
    }, 250);
    return () => clearTimeout(handler);
  }, [q, tags, difficulty, location.pathname, location.search, navigate]);

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
            placeholder="Search by name, tags, category…"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-[160px] rounded-md border border-gray-200 bg-white px-2 py-2 text-sm focus:outline-none focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="">All difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
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
                <Badge color={active ? 'gradientOutline' : 'gray'}>{t}</Badge>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Filters;
