import React from "react";

/**
 * PUBLIC_INTERFACE
 * Images
 * Image display patterns: aspect, object-cover, rounded, and captions.
 */
export default function Images() {
  const url =
    "https://images.unsplash.com/photo-1514511542485-579a6bdeae66?q=80&w=1200&auto=format&fit=crop";
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <figure className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <img src={url} alt="Ocean rock" className="h-48 w-full object-cover" />
        <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-300">
          Object cover with rounded container
        </figcaption>
      </figure>
      <figure className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
        <img src={url} alt="Ocean rock" className="mx-auto w-64 rounded-md shadow" />
        <figcaption className="pt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Centered with fixed width
        </figcaption>
      </figure>
    </div>
  );
}
