import components from '../data/components.json';
import categories from '../data/categories.json';
import { assertUniqueComponentIds } from './validate';

/**
 * Simple data utilities that read from local JSON files.
 * No network calls; functions return synchronous data.
 */

/**
 * PUBLIC_INTERFACE
 * getAllComponents
 * Returns the complete list of component metadata.
 */
/* Development-time validation: check for duplicate ids */
assertUniqueComponentIds(components);

export function getAllComponents() {
  /** Returns an array of all component objects available in the local registry. */
  return components;
}

/**
 * PUBLIC_INTERFACE
 * getComponentById
 * Returns a single component by id, or undefined if not found.
 */
export function getComponentById(id) {
  /** Find a component by its unique id. Case-sensitive match. */
  return components.find((c) => c.id === id);
}

/**
 * PUBLIC_INTERFACE
 * getComponentsByCategory
 * Returns components belonging to a given category slug.
 */
export function getComponentsByCategory(categorySlug) {
  /** Filter components by the 'category' field using a slug like 'buttons'. */
  if (!categorySlug) return [];
  return components.filter((c) => c.category === categorySlug);
}

/**
 * PUBLIC_INTERFACE
 * getCategories
 * Returns the list of available categories.
 */
export function getCategories() {
  /** Returns an array of category objects with name, slug, description. */
  return categories;
}

/**
 * PUBLIC_INTERFACE
 * getFeaturedComponents
 * Returns a curated set of featured components.
 * If none are marked featured, returns the first few items as fallback.
 */
export function getFeaturedComponents(limit = 6) {
  /** Returns an array of featured components up to the specified limit. */
  const featured = components.filter((c) => Boolean(c.featured));
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  return components.slice(0, limit);
}
