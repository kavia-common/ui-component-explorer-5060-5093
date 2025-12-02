import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseQueryParams, buildQueryString } from '../../utils/filter';

/**
 * PUBLIC_INTERFACE
 * SearchBar is a search input that syncs with ?q= URL param (debounced).
 * Props:
 * - placeholder?: string
 * - compact?: boolean (renders a smaller control)
 */
function SearchBar({ placeholder = 'Search…', compact = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQ = useMemo(() => parseQueryParams(location.search).q || '', [location.search]);
  const [value, setValue] = useState(initialQ);

  // keep internal state in sync when URL changes externally
  useEffect(() => {
    setValue(initialQ);
  }, [initialQ]);

  // debounce updates to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      const current = parseQueryParams(location.search);
      if ((current.q || '') !== (value || '')) {
        const next = buildQueryString({ ...current, q: value });
        navigate({ pathname: location.pathname, search: next }, { replace: true });
      }
    }, 250);
    return () => clearTimeout(handler);
  }, [value, location.pathname, location.search, navigate]);

  return (
    <div className={`w-full ${compact ? 'max-w-[180px]' : 'max-w-xl'}`}>
      <label className="sr-only" htmlFor="global-search">Search</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <input
          id="global-search"
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full rounded-lg border border-gray-200 bg-white pl-10 placeholder:text-gray-400 focus:outline-none focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 ${compact ? 'py-1.5 text-sm' : 'py-2.5'}`}
        />
      </div>
    </div>
  );
}

export default SearchBar;
