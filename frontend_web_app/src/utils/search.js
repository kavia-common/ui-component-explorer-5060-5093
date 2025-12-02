//
// PUBLIC_INTERFACE
/**
 * searchComponents - Perform a ranked search across component fields.
 * Ranks by:
 *  - Exact name startsWith match
 *  - Name includes
 *  - Tag exact/includes
 *  - Category exact/includes
 *  - SEO keywords includes
 *
 * @param {Array} items - components with fields: name, tags, category, seo?.keywords?
 * @param {string} query - search text
 * @returns {Array} ranked items
 */
export function searchComponents(items = [], query = '') {
  if (!query) return items;
  const q = query.trim().toLowerCase();
  if (!q.length) return items;

  const scoreItem = (it) => {
    let score = 0;
    const name = (it.name || '').toLowerCase();
    const tags = (it.tags || []).map((t) => (t || '').toLowerCase());
    const category = (it.category || '').toLowerCase();
    const keywords = Array.isArray(it?.seo?.keywords)
      ? it.seo.keywords.map((k) => (k || '').toLowerCase())
      : [];

    // Name weighting
    if (name === q) score += 100;
    if (name.startsWith(q)) score += 60;
    if (name.includes(q)) score += 40;

    // Tags weighting
    if (tags.includes(q)) score += 35;
    if (tags.some((t) => t.includes(q))) score += 20;

    // Category weighting
    if (category === q) score += 25;
    if (category.includes(q)) score += 10;

    // SEO keywords
    if (keywords.includes(q)) score += 15;
    if (keywords.some((k) => k.includes(q))) score += 8;

    return score;
  };

  return items
    .map((it) => ({ it, score: scoreItem(it) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);
}
