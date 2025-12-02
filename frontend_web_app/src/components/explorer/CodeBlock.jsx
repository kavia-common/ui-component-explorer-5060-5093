import React, { useEffect, useMemo, useRef, useState } from 'react';
import { copyCodeSnippet } from '../../utils/copy';
import { oceanTheme } from '../../utils/tokens';

/**
 * PUBLIC_INTERFACE
 * CodeBlock - Render a code snippet with preserved whitespace, optional header, and copy-to-clipboard.
 * Props:
 * - code: string - the code snippet to render. Supports \n and indentation; rendered in a <pre><code>.
 * - language: string (optional) - language hint used for className. Ex: 'jsx', 'html', 'js'.
 * - showHeader: boolean (optional, default true) - renders a header bar with title and Copy button.
 * - title: string (optional, default 'Code') - header title.
 * - className: string (optional) - additional class names for the root surface.
 * - enableBasicHighlight: boolean (optional, default true) - use a minimal regex-based highlighter for JSX/HTML.
 *
 * Note: We don't add external dependencies (e.g., Prism) to keep the bundle light by default.
 * The minimal highlighter only handles tags/attributes/strings for JSX/HTML and falls back gracefully.
 */
function CodeBlock({
  code = '',
  language = 'jsx',
  showHeader = true,
  title = 'Code',
  className = '',
  enableBasicHighlight = true,
}) {
  const [copied, setCopied] = useState(false);
  const normalized = useMemo(() => (typeof code === 'string' ? code : String(code ?? '')), [code]);
  const codeRef = useRef(null);

  // Minimal client-side highlighter for HTML/JSX if enabled.
  const highlighted = useMemo(() => {
    if (!enableBasicHighlight) return normalized;
    const lang = (language || '').toLowerCase();
    if (!normalized) return '';

    // Only highlight simple HTML/JSX. Avoid expensive regex for other languages.
    if (lang === 'html' || lang === 'jsx') {
      let html = normalized
        // Escape HTML to avoid injection
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Tags
      html = html.replace(/(&lt;\/?)([a-zA-Z0-9-]+)(?=[\s/&gt;])/g, (_, p1, p2) => {
        return `${p1}<span class="text-amber-300">${p2}</span>`;
      });
      // Attributes
      html = html.replace(/(\s)([a-zA-Z_:][a-zA-Z0-9:._-]*)(=)/g, (_, s, attr, eq) => {
        return `${s}<span class="text-sky-300">${attr}</span>${eq}`;
      });
      // Strings
      html = html.replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (m) => {
        if (m.startsWith('&quot;') || m.startsWith('&#39;')) {
          return `<span class="text-green-300">${m}</span>`;
        }
        return `<span class="text-green-300">${m}</span>`;
      });
      // Punctuation for <, >, = already escaped; soften equals for contrast
      html = html.replace(/=/g, '<span class="text-slate-300">=</span>');
      return html;
    }

    // Default: return safely escaped without highlight
    return normalized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }, [normalized, language, enableBasicHighlight]);

  const onCopy = async () => {
    const ok = await copyCodeSnippet(normalized);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  // Ensure code text copies fully if user selects manually
  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    // Nothing required for selection; we leave as plain contentEditable false.
  }, []);

  return (
    <div className={`rounded-lg border shadow-sm ${oceanTheme.classes.surfaceCard} ${className}`}>
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
          <div className="flex items-center gap-2 px-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            {title}
          </div>
          <div className="px-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-gray-50 focus:outline-none focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
              aria-label="Copy code"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ) : null}
      <div className="bg-gray-900">
        <pre
          className="custom-scrollbar max-h-[420px] overflow-auto p-4 text-xs leading-relaxed text-gray-100"
          style={{
            // preserve whitespace and indentation; prevent word breaks
            whiteSpace: 'pre', // Tailwind: whitespace-pre (ensure no collapsing)
            wordBreak: 'normal',
            overflowWrap: 'normal',
          }}
        >
          {/* Use dangerouslySetInnerHTML for minimal highlighting; fallback to plain text if disabled */}
          <code
            ref={codeRef}
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlighted || '&lt;div /&gt;' }}
          />
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
