module.exports = {
  webpack: {
    // PUBLIC_INTERFACE
    // configure - Minimal CRA Webpack customization placeholder.
    // With Preline removed, we do not need special loader handling.
    configure: (webpackConfig) => {
      // Keep ignoreWarnings for noisy third-party source map parse issues (general safety)
      webpackConfig.ignoreWarnings = Array.from(
        new Set((webpackConfig.ignoreWarnings || []).concat([/Failed to parse source map/]))
      );
      return webpackConfig;
    },
  },
};
