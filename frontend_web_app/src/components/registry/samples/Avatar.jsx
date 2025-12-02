import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Avatar - circular user avatar with image fallback to initials.
 */
export function Avatar({ name = 'User', src, size = 'md' }) {
  const [error, setError] = useState(false);
  const sizes = { sm: 24, md: 40, lg: 56 };
  const d = sizes[size] || sizes.md;
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className="inline-flex items-center justify-center rounded-full bg-gray-200 text-slate-700 dark:bg-gray-700 dark:text-slate-200"
      style={{ width: d, height: d, fontSize: d / 2.8 }}
      aria-label={name}
      title={name}
    >
      {src && !error ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full rounded-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * AvatarGroup - stacked avatars with overflow +N.
 */
export function AvatarGroup({ users = [], max = 3 }) {
  const visible = users.slice(0, max);
  const overflow = users.length - visible.length;
  const overlap = '-ml-2 first:ml-0';
  return (
    <div className="flex items-center">
      {visible.map((u, i) => (
        <div key={i} className={`ring-2 ring-white dark:ring-gray-900 ${overlap}`}>
          <Avatar name={u.name} src={u.src} size="md" />
        </div>
      ))}
      {overflow > 0 ? (
        <div
          className={`inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-xs font-medium text-slate-700 ring-2 ring-white dark:bg-gray-700 dark:text-slate-200 dark:ring-gray-900 ${overlap}`}
          style={{ height: 40 }}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
