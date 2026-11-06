// "The same place": two bookmarks closer than about 55 m are treated as one place.
// (Pins from the map, a search and a saved caption land a few metres apart, so exact matching is too strict.)
export const NEAR_DEGREES = 0.0005;

export const lonTolerance = (lat) => NEAR_DEGREES / Math.max(Math.cos((lat * Math.PI) / 180), 0.01);

export const isNearby = (a, b) =>
  a.lat != null && a.lon != null && b.lat != null && b.lon != null &&
  Math.abs(a.lat - b.lat) <= NEAR_DEGREES && Math.abs(a.lon - b.lon) <= lonTolerance(a.lat);

const joinNotes = (a, b) => {
  const x = (a ?? "").trim();
  const y = (b ?? "").trim();
  if (!y || x.includes(y)) return x;
  if (!x) return y;
  const both = `${x}\n\n${y}`;
  return both.length <= 2000 ? both : x;
};

/**
 * Works out how to merge bookmarks that sit at the same place.
 * The oldest bookmark at a place is kept. Anything it lacks (caption, folder, note) is filled in
 * from the duplicates, which are then removed. Bookmarks without a location are never touched.
 * Returns [{ keeper_id, remove_ids, patch }].
 */
export function planMerges(rows) {
  const located = rows
    .filter((b) => b.lat != null && b.lon != null)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || String(a.id).localeCompare(String(b.id)));
  const groups = [];
  for (const b of located) {
    const group = groups.find((g) => isNearby(g.keeper, b));
    if (group) group.dups.push(b);
    else groups.push({ keeper: b, dups: [] });
  }
  return groups
    .filter((g) => g.dups.length > 0)
    .map(({ keeper, dups }) => {
      const patch = {};
      const caption = keeper.caption_id ? null : dups.find((d) => d.caption_id);
      if (caption) patch.caption_id = caption.caption_id;
      const folder = keeper.list_id ? null : dups.find((d) => d.list_id);
      if (folder) patch.list_id = folder.list_id;
      let note = keeper.note ?? "";
      for (const d of dups) note = joinNotes(note, d.note);
      if (note !== (keeper.note ?? "")) patch.note = note;
      return { keeper_id: keeper.id, remove_ids: dups.map((d) => d.id), patch };
    });
}
