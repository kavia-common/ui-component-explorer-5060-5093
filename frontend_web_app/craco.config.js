module.exports = {
  webpack: {
    // PUBLIC_INTERFACE
    // configure - Safely remove source-map-loader from CRA webpack config to prevent
    // parsing of TS/d.ts from dependencies like Preline, without producing invalid rule shapes.
    configure: (webpackConfig) => {
      const isSourceMapLoader = (u) =>
        (typeof u === 'string' && u.includes('source-map-loader')) ||
        (u && typeof u.loader === 'string' && u.loader.includes('source-map-loader'));

      const prelineTsExcludes = [
        /node_modules\/preline\/.*\.ts$/,
        /node_modules\/preline\/.*\.tsx$/,
        /node_modules\/preline\/.*\.d\.ts$/,
        /node_modules\/preline\/src\/.*\.ts$/,
        /node_modules\/preline\/src\/.*\.tsx$/,
        /node_modules\/preline\/src\/.*\.d\.ts$/,
      ];

      const sanitizeRule = (rule) => {
        if (!rule || typeof rule !== 'object') return rule;

        // Clone to avoid accidental mutations that break schema
        const next = { ...rule };

        // Remove source-map-loader from 'use'
        if (next.use) {
          const uses = Array.isArray(next.use) ? next.use : [next.use];
          const filtered = uses.filter((u) => !isSourceMapLoader(u));
          if (filtered.length === 0) {
            // No remaining loaders -> drop this rule by returning null (to be filtered out)
            return null;
          }
          next.use = Array.isArray(next.use) ? filtered : filtered[0];
        }

        // Remove direct 'loader' if it is source-map-loader
        if (next.loader && typeof next.loader === 'string' && next.loader.includes('source-map-loader')) {
          // No other information, drop this rule
          return null;
        }

        // Only add Preline TS excludes if rule is explicitly a pre rule (keep schema consistent)
        if (next.enforce === 'pre') {
          const existingExclude = next.exclude
            ? (Array.isArray(next.exclude) ? next.exclude : [next.exclude])
            : [];
          next.exclude = Array.from(new Set(existingExclude.concat(prelineTsExcludes)));
        }

        // Recurse into nested rule containers
        if (Array.isArray(next.oneOf)) {
          next.oneOf = next.oneOf.map(sanitizeRule).filter(Boolean);
        }
        if (Array.isArray(next.rules)) {
          next.rules = next.rules.map(sanitizeRule).filter(Boolean);
        }
        if (Array.isArray(next.children)) {
          next.children = next.children.map(sanitizeRule).filter(Boolean);
        }

        return next;
      };

      if (webpackConfig && webpackConfig.module && Array.isArray(webpackConfig.module.rules)) {
        webpackConfig.module.rules = webpackConfig.module.rules
          .map(sanitizeRule)
          .filter(Boolean);
      }

      // Silence source map parse warnings from third-party packages
      webpackConfig.ignoreWarnings = Array.from(
        new Set((webpackConfig.ignoreWarnings || []).concat([/Failed to parse source map/]))
      );

      return webpackConfig;
    },
  },
};
