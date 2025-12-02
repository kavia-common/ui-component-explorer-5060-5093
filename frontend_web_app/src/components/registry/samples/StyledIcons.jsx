import React from 'react';
import Icon from '../../common/Icon';

/**
 * PUBLIC_INTERFACE
 * StyledIcons - consistent sizing and containers for icons.
 */
function StyledIcons() {
  const variants = [
    { name: 'search', bg: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
    { name: 'check', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' },
    { name: 'alert', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' },
  ];
  return (
    <div className="flex items-center gap-3">
      {variants.map((v) => (
        <div key={v.name} className={`flex h-10 w-10 items-center justify-center rounded-md ${v.bg}`}>
          <Icon name={v.name} />
        </div>
      ))}
    </div>
  );
}

export default StyledIcons;
