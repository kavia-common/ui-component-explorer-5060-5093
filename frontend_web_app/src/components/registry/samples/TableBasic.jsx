import React, { useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TableBasic
 * A Tailwind-first responsive table with simple client-side pagination.
 * - Accessible: uses <table>, <thead>, <tbody>, <th scope="col">, <td>, caption, and role semantics.
 * - Responsive: horizontally scrollable on small screens using overflow-x-auto, supports dark mode via Tailwind classes.
 * - Pagination: basic previous/next with page size selection.
 *
 * Props:
 * - columns: Array<{ key: string; header: string; className?: string }>
 * - data: Array<Record<string, any>>
 * - pageSizeOptions?: number[]  // defaults [5, 10, 20]
 * - initialPageSize?: number    // defaults 10
 * - caption?: string            // optional caption for accessibility
 */
const TableBasic = ({
  columns = [],
  data = [],
  pageSizeOptions = [5, 10, 20],
  initialPageSize = 10,
  caption = 'Data table',
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const pageData = useMemo(() => {
    const start = page * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const onPrev = () => canPrev && setPage((p) => p - 1);
  const onNext = () => canNext && setPage((p) => p + 1);
  const onPageSizeChange = (e) => {
    const size = Number(e.target.value);
    setPageSize(size);
    setPage(0);
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
            onChange={onPageSizeChange}
          >
            {pageSizeOptions.map((opt) => (
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
            {caption ? (
              <caption className="sr-only">{caption}</caption>
            ) : null}
            <thead className="bg-gray-50 dark:bg-gray-800/40">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 ${col.className || ''}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {pageData.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    colSpan={columns.length || 1}
                  >
                    No data available.
                  </td>
                </tr>
              ) : (
                pageData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                  >
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
            Showing {pageData.length} of {data.length} row{data.length === 1 ? '' : 's'}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
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

export default TableBasic;
