//
// PUBLIC_INTERFACE
/**
 * filterComponents - Filter components by tags and difficulty.
 * Difficulty can be a string or array; components may have difficulty field.
 *
 * @param {Array} items - components with fields: tags?: string[], difficulty?: string
 * @param {Object} filter - { tags?: string[] , difficulty?: string }
 * @returns {Array} filtered items
 */
export function filterComponents(items = [], filter = {}) {
  const tags = Array.isArray(filter.tags) ? filter.tags.filter(Boolean) : [];
  const difficulty = filter.difficulty || '';

  return items.filter((it) => {
    const tagOk =
      tags.length === 0 || tags.every((t) => (it.tags || []).includes(t));
    const difficultyOk =
      !difficulty ||
      `${(it.difficulty || '').toLowerCase()}` === `${difficulty}`.toLowerCase();
    return tagOk && difficultyOk;
  });
}

/**
 * parseQueryParams - parse the URLSearchParams into state object.
 * Supports q, tags (comma-separated), difficulty.
 */
// PUBLIC_INTERFACE
export function parseQueryParams(search) {
  const params = new URLSearchParams(search || '');
  const q = params.get('q') || '';
  const tags = (params.get('tags') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const difficulty = params.get('difficulty') || '';
  return { q, tags, difficulty };
}

/**
 * buildQueryString - Given state, build a query string (without leading path).
 */
// PUBLIC_INTERFACE
export function buildQueryString({ q = '', tags = [], difficulty = '' } = {}) {
  const params = new URLSearchParams();
  if (q && q.trim().length) params.set('q', q.trim());
  if (tags && tags.length) params.set('tags', tags.join(','));
  if (difficulty && difficulty.trim().length)
    params.set('difficulty', difficulty.trim());
  const s = params.toString();
  return s ? `?${s}` : '';
}
