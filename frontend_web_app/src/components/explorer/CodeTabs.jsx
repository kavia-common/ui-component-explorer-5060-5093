import React, { useMemo, useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { copyCodeSnippet } from '../../utils/copy';

/**
 * PUBLIC_INTERFACE
 * CodeTabs - Code view with copy control only (no mode toggles).
 * Props:
 * - code: string
 *
 * Important: Do not render Preview/Code toggles here. Parent pages control mode and provide any
 * header actions to their own headers. This component focuses solely on rendering code and copy.
 */
function CodeTabs({ code = '' }) {
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => (typeof code === 'string' ? code : String(code ?? '')), [code]);

  const copy = async () => {
    const ok = await copyCodeSnippet(normalized);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
        <div className="flex items-center gap-2 px-2 text-sm font-medium text-slate-800 dark:text-slate-200">
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
      <pre className="custom-scrollbar max-h-[420px] overflow-auto bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
        <code>{normalized || '<div />'}</code>
      </pre>
    </div>
  );
}

export default CodeTabs;
