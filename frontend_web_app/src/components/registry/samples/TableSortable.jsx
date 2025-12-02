import React, { useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TableSortable
 * Tailwind-first responsive table with clickable sortable column headers and basic pagination.
 * - Accessible headers with button semantics for sorting.
 * - Announces sort state via aria-sort on <th>.
 *
 * Props:
 * - columns: Array<{ key: string; header: string; sortable?: boolean; className?: string }>
 * - data: Array<Record<string, any>>
 * - initialSort?: { key: string; direction: 'asc' | 'desc' }
 * - initialPageSize?: number
 * - caption?: string
 */
const TableSortable = ({
  columns = [],
  data = [],
  initialSort = undefined,
  initialPageSize = 10,
  caption = 'Sortable data table',
}) => {
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const sortedData = useMemo(() => {
    if (!sort?.key) return data;
    const arr = [...data];
    const { key, direction } = sort;
    arr.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return direction === 'asc' ? -1 : 1;
      if (bv == null) return direction === 'asc' ? 1 : -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return direction === 'asc' ? av - bv : bv - av;
      }
      return direction === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [data, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const pageData = useMemo(() => {
    const start = page * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const requestSort = (key) => {
    setPage(0);
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const sortIcon = (colKey) => {
    if (sort?.key !== colKey) {
      return (
        <span aria-hidden className="ml-1 text-gray-400">↕</span>
      );
    }
    return sort.direction === 'asc' ? (
      <span aria-hidden className="ml-1 text-gray-600 dark:text-gray-300">▲</span>
    ) : (
      <span aria-hidden className="ml-1 text-gray-600 dark:text-gray-300">▼</span>
    );
  };

  const ariaSort = (colKey) => {
    if (sort?.key !== colKey) return 'none';
    return sort.direction === 'asc' ? 'ascending' : 'descending';
    // HTML Spec allows: 'none' | 'ascending' | 'descending' | 'other'
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Rows per page:{' '}
          <select
            aria-label="Rows per page"
            className="ml-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
          >
            {[5, 10, 20].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Page {page + 1} of {totalPages}
        </div>
      </div>

      <div className="relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800" role="table">
            {caption ? <caption className="sr-only">{caption}</caption> : null}
            <thead className="bg-gray-50 dark:bg-gray-800/40">
              <tr>
                {columns.map((col) => {
                  const headContent = col.sortable ? (
                    <button
                      type="button"
                      onClick={() => requestSort(col.key)}
                      className="inline-flex items-center hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                      aria-label={`Sort by ${col.header}`}
                    >
                      <span>{col.header}</span>
                      {sortIcon(col.key)}
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  );

                  return (
                    <th
                      key={col.key}
                      scope="col"
                      aria-sort={ariaSort(col.key)}
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 ${col.className || ''}`}
                    >
                      {headContent}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {pageData.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    colSpan={columns.length || 1}
                  >
                    No data to display.
                  </td>
                </tr>
              ) : (
                pageData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100 whitespace-nowrap"
                      >
                        {String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Showing {pageData.length} of {sortedData.length} row{sortedData.length === 1 ? '' : 's'}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSortable;
