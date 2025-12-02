import React, { useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * FileInput - styled file input with button and filename preview
 */
function FileInput() {
  const inputRef = useRef(null);
  const [name, setName] = useState('');
  return (
    <div className="w-full max-w-md">
      <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">Upload file</label>
      <div className="flex">
        <button
          type="button"
          className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700"
          onClick={() => inputRef.current?.click()}
        >
          Choose
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => setName(e.target.files?.[0]?.name || '')}
        />
        <input
          readOnly
          value={name}
          placeholder="No file chosen"
          className="min-w-0 flex-1 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        />
      </div>
      <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Max size 5MB. Allowed: PNG, JPG, PDF.</div>
    </div>
  );
}

export default FileInput;
