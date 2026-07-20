// Initials + colour for clubs without a bundled crest. Kept three-free so
// both the globe textures and the (non-three) panel chunk can use it.

// Tokens that don't belong in initials ("FC Utrecht" -> "U", not "FU").
const STOPWORDS = new Set(['fc', 'afc', 'cf', 'ac', 'as', 'ss', 'ssc', 'us', 'rc', 'rcd', 'cd', 'sd', 'ud', 'ca', 'sc', 'sv', 'vv', 'bv', 'de', '1.', 'aj', 'losc', 'ogc', 'tsg', 'vfb', 'vfl']);

export function badgeInitials(name: string): string {
  const words = name.split(/\s+/).filter((w) => !STOPWORDS.has(w.toLowerCase()));
  const source = words.length > 0 ? words : name.split(/\s+/);
  if (source.length === 1) return source[0].slice(0, 3).toUpperCase();
  return source.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
}

export function badgeColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const hue = ((hash % 360) + 360) % 360;
  return `hsl(${hue}, 42%, 38%)`;
}
