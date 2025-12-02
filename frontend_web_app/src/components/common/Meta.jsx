import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * PUBLIC_INTERFACE
 * Meta - Centralized SEO component using react-helmet-async.
 * Sets title, description, canonical, and social meta (OpenGraph/Twitter).
 * Props:
 * - title?: string
 * - description?: string
 * - canonical?: string
 * - image?: string (absolute URL)
 * - type?: string (og:type, default 'website')
 * - jsonLd?: object | null (structured data to inject as application/ld+json)
 */
function Meta({
  title = 'UI Component Explorer',
  description = 'Browse, preview, and copy ready-to-use React + Tailwind components with dark/light mode.',
  canonical,
  image,
  type = 'website',
  jsonLd = null,
}) {
  const siteName = 'UI Component Explorer';
  const fullTitle = title ? `${title} • ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* Theme color (kept consistent with Tailwind primary) */}
      <meta name="theme-color" content="#2563EB" />

      {/* JSON-LD structured data */}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

export default Meta;
