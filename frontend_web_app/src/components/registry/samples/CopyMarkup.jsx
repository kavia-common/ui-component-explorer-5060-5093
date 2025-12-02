import React, { useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * CopyMarkup - shows markup in a code block and copies to clipboard
 * Props:
 * - code: string
 */
function CopyMarkup({ code = '<button class=\"btn\">Click</button>' }) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Markup</div>
        <button
          onClick={copy}
          className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-auto rounded bg-gray-50 p-3 text-xs text-slate-800 dark:bg-gray-900 dark:text-slate-200"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CopyMarkup;
