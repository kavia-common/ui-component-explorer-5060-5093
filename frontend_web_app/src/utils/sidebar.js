import sidebarItems from '../data/sidebarItems.json';

/**
 * PUBLIC_INTERFACE
 * getSidebarIndex - build quick lookup maps for groups and items by slug.
 * Returns { groupBySlug: Map, itemBySlug: Map }
 */
export function getSidebarIndex() {
  const groupBySlug = new Map();
  const itemBySlug = new Map();

  const groups = Array.isArray(sidebarItems) ? sidebarItems : [];
  groups.forEach((g) => {
    if (!g || !g.slug) return;
    const group = {
      group: String(g.group || ''),
      slug: String(g.slug || ''),
      blurb: String(g.blurb || ''),
    };
    groupBySlug.set(group.slug, group);

    const items = Array.isArray(g.items) ? g.items : [];
    items.forEach((it) => {
      if (!it || !it.slug) return;
      itemBySlug.set(String(it.slug), {
        label: String(it.label || ''),
        slug: String(it.slug || ''),
        blurb: String(it.blurb || ''),
        group: group.group,
        groupSlug: group.slug,
      });
    });
  });

  return { groupBySlug, itemBySlug };
}

/**
 * PUBLIC_INTERFACE
 * getItemMetaBySlug - given an item slug, return { label, slug, blurb, group, groupSlug } or undefined.
 */
export function getItemMetaBySlug(slug) {
  const { itemBySlug } = getSidebarIndex();
  return itemBySlug.get(String(slug || ''));
}

/**
 * PUBLIC_INTERFACE
 * getGroupForItem - given an item slug, return the group metadata (or undefined).
 */
export function getGroupForItem(slug) {
  const { groupBySlug } = getSidebarIndex();
  const item = getItemMetaBySlug(slug);
  if (!item) return undefined;
  return groupBySlug.get(item.groupSlug);
}
