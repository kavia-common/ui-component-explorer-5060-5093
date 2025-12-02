import React from 'react';

/**
 * PUBLIC_INTERFACE
 * MediaCard - image, title, description layout
 * Props:
 * - title?: string
 * - description?: string
 * - imageUrl?: string
 */
function MediaCard({ title = 'Ocean Sunset', description = 'A calming gradient with blue and amber accents.', imageUrl = 'https://picsum.photos/seed/ocean/160/100' }) {
  return (
    <article className="w-full max-w-xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
      <div className="flex flex-col gap-3 p-3 sm:flex-row">
        <img
          src={imageUrl}
          alt={title}
          className="h-28 w-full rounded-md object-cover sm:h-24 sm:w-40"
          loading="lazy"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{description}</p>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-amber-400" />
        </div>
      </div>
    </article>
  );
}

export default MediaCard;
