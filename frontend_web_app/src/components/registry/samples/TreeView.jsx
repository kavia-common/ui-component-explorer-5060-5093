import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TreeView - simple expandable hierarchical list.
 */
function Node({ node }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  return (
    <div>
      <button
        className="flex items-center gap-1 py-0.5 text-left text-sm text-slate-800 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:text-blue-300"
        onClick={() => hasChildren && setOpen((v) => !v)}
        aria-expanded={open}
      >
        {hasChildren ? <span>{open ? '▾' : '▸'}</span> : <span className="opacity-0">•</span>}
        <span className="font-normal">{node.label}</span>
      </button>
      {hasChildren && open ? (
        <div className="ml-4 border-l border-gray-200 pl-3 dark:border-gray-800">
          {node.children.map((c, idx) => (
            <Node key={idx} node={c} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TreeView({ data = [] }) {
  return (
    <div className="rounded-md border border-gray-200 p-3 dark:border-gray-800">
      {data.map((n, i) => (
        <Node key={i} node={n} />
      ))}
    </div>
  );
}

export default TreeView;
