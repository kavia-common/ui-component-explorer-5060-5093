'use strict';

/**
 * PUBLIC_INTERFACE
 * A minimal webpack loader that returns empty JS for any input.
 * Used to ignore TypeScript declaration files (.d.ts) from dependencies like Preline.
 *
 * @param {string|Buffer} source
 * @returns {string}
 */
module.exports = function emptyLoader(source) {
  // Mark loader as cacheable when available
  if (this && typeof this.cacheable === 'function') {
    this.cacheable();
  }
  // Return empty module to skip parsing
  return '';
};
