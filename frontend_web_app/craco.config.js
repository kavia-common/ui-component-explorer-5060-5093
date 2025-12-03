const path = require('path');

/**
 * PUBLIC_INTERFACE
 * CRACO configuration to adjust CRA webpack without ejecting.
 * - Excludes source-map-loader from processing node_modules/preline/**/*.ts
 * - Ensures that only compiled JS from Preline is considered.
 */
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove source-map-loader from applying to Preline TS files
      if (webpackConfig.module && Array.isArray(webpackConfig.module.rules)) {
        webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
          if (rule && rule.enforce === 'pre' && Array.isArray(rule.use)) {
            // Typical CRA rule for source-map-loader
            const useIsSourceMapLoader = rule.use.find(
              (u) =>
                (typeof u === 'string' && u.includes('source-map-loader')) ||
                (u && typeof u.loader === 'string' && u.loader.includes('source-map-loader'))
            );
            if (useIsSourceMapLoader) {
              // Ensure exclude for preline ts sources
              const exclude = rule.exclude
                ? Array.isArray(rule.exclude)
                  ? rule.exclude
                  : [rule.exclude]
                : [];
              exclude.push(/node_modules\/preline\/src\/.*\.ts$/);
              exclude.push(/node_modules\/preline\/src\/.*\.tsx$/);
              exclude.push(/node_modules\/preline\/.*\.d\.ts$/);
              return { ...rule, exclude };
            }
          }
          return rule;
        });
      }

      // Resolve alias guard (not strictly required, but ensures no accidental 'preline/src' usage)
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
      webpackConfig.resolve.alias['preline/src'] = path.resolve(__dirname, 'node_modules/preline/dist');

      return webpackConfig;
    },
  },
};
