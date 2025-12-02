import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Icon - Minimal inline SVG icons.
 * Props:
 * - name: 'arrow-right'|'copy'|'check'|'code'|'adjustments'|'search'
 * - className?: string
 * - strokeWidth?: number
 */
function Icon({ name, className = 'h-4 w-4', strokeWidth = 2 }) {
  switch (name) {
    case 'arrow-right':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'copy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
          <rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
        </svg>
      );
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'code':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'adjustments':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 10V4M6 20v-4M12 6V4m0 16v-8M18 14V4m0 16v-2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
          <circle cx="6" cy="14" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
          <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
          <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
        </svg>
      );
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default Icon;
