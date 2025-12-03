import React from "react";

/**
 * PUBLIC_INTERFACE
 * Images
 * Comprehensive image patterns: local asset, scrollable container, cover, fullscreen overlay (Preline), and zoom-on-hover.
 * Ocean Professional palette with dark mode.
 */
export default function Images() {
  const remote = "https://images.unsplash.com/photo-1514511542485-579a6bdeae66?q=80&w=1200&auto=format&fit=crop";
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Basic cover/caption */}
      <figure className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <img src={remote} alt="Coastline rocks and waves" className="h-48 w-full object-cover" />
        <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-300">
          Object cover with rounded container
        </figcaption>
      </figure>

      {/* Local image asset */}
      <figure className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
        <img
          src="/assets/20251202_181221_image.png"
          alt="Local example"
          className="mx-auto h-32 w-auto rounded-md border object-cover shadow-sm dark:border-gray-700"
          loading="lazy"
        />
        <figcaption className="pt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Local image from public/assets
        </figcaption>
      </figure>

      {/* Scrollable container with custom scrollbar */}
      <div>
        <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Scrollable container</div>
        <div className="custom-scrollbar h-40 w-full overflow-auto rounded-md border dark:border-gray-700">
          <img
            src="https://picsum.photos/seed/scroll/900/600"
            alt="Scrollable large image"
            className="max-w-none"
            loading="lazy"
          />
        </div>
      </div>

      {/* Aspect cover with gradient overlay */}
      <div>
        <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Cover</div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <img
            src="https://picsum.photos/seed/cover/800/450"
            alt="Cover"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Fullscreen overlay via Preline */}
      <div>
        <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Fullscreen overlay (Preline)</div>
        <button
          type="button"
          className="rounded-md bg-[#2563EB] px-3 py-1.5 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
          data-hs-overlay="#img-full"
        >
          Open Image
        </button>
        <div
          id="img-full"
          className="hs-overlay fixed start-0 top-0 z-[80] hidden h-full w-full overflow-y-auto overflow-x-hidden"
          aria-hidden="true"
        >
          <div className="m-3 mt-7 sm:mx-auto sm:w-full sm:max-w-3xl">
            <div className="relative rounded-xl bg-white shadow-lg dark:bg-gray-900">
              <div className="absolute end-2 top-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
                  aria-label="Close"
                  data-hs-overlay="#img-full"
                >
                  ×
                </button>
              </div>
              <img
                src="https://picsum.photos/seed/full/1200/800"
                alt="Fullscreen example"
                className="h-auto w-full rounded-b-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Zoom on hover */}
      <div>
        <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">Zoom on hover</div>
        <figure className="relative h-40 w-full overflow-hidden rounded-lg">
          <img
            src="https://picsum.photos/seed/zoom/600/400"
            alt="Zoom hover"
            className="h-full w-full transform object-cover transition duration-300 ease-out hover:scale-105"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  );
}
