import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Blockquote - semantic quote with accent border and optional citation.
 */
function Blockquote({ children = '“Simplicity is the soul of efficiency.”', cite = 'Austin Freeman' }) {
  return (
    <figure className="space-y-2">
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-700 dark:text-slate-200">
        {children}
      </blockquote>
      {cite ? <figcaption className="text-xs text-slate-600 dark:text-slate-300">— {cite}</figcaption> : null}
    </figure>
  );
}

export default Blockquote;
