import React, { useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';

/**
 * PUBLIC_INTERFACE
 * CodeTabs - Tabs for viewing code (and future variants).
 * Props:
 * - code: string
 */
function CodeTabs({ code = '' }) {
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
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
        <div className="flex items-center gap-2 px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Icon name="code" />
          <span>Code</span>
        </div>
        <div className="px-2">
          <Button variant="secondary" size="sm" onClick={copy} aria-label="Copy code">
            {copied ? (
              <>
                <Icon name="check" /> Copied
              </>
            ) : (
              <>
                <Icon name="copy" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>
      <pre className="max-h-[420px] overflow-auto bg-gray-900 p-4 text-xs text-gray-100">
{code || '<div />'}
      </pre>
    </div>
  );
}

export default CodeTabs;
