 // PUBLIC_INTERFACE
 export function assertUniqueComponentIds(list) {
   /** Ensures that component IDs are unique; logs an error in development if duplicates exist. */
   if (!Array.isArray(list)) return;
   const seen = new Map();
   const dups = [];
   list.forEach((c) => {
     const id = c && c.id;
     if (!id) return;
     if (seen.has(id)) {
       dups.push(id);
     } else {
       seen.set(id, true);
     }
   });
   if (dups.length > 0 && typeof window !== 'undefined') {
     // eslint-disable-next-line no-console
     console.error('[components.json] Duplicate component ids detected:', Array.from(new Set(dups)));
   }
 }
