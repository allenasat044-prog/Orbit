import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { signToken } from "../src/auth/tokens.js";
import { createLibraryRouter } from "../src/library/routes.js";
import { ConflictError, slugify } from "../src/library/repo.js";
import { isNearby, planMerges } from "../src/library/places.js";

const config = { corsOrigin: "http://localhost:5173", rateLimitPerMin: 10000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };
const U1 = { id: "11111111-1111-4111-8111-111111111111", name: "Ada Lovelace", email: "ada@example.com", created_at: "2026-01-01T00:00:00Z", role: "user" };
const U2 = { id: "22222222-2222-4222-8222-222222222222", name: "Bob", email: "bob@example.com", created_at: "2026-01-02T00:00:00Z", role: "user" };
const CAP = "33333333-3333-4333-8333-333333333333";
const CAP2 = "44444444-4444-4444-8444-444444444444";

function fakeLibrary() {
  const profiles = new Map();
  const labels = [];
  const lists = [];
  const bookmarks = [];
  const id = () => crypto.randomUUID();
  const dup = (arr, uid, name) => arr.some((x) => x.user_id === uid && x.name.toLowerCase() === name.toLowerCase());
  const view = (b) => ({ ...b, caption_text: null, chip_id: null, labels: labels.filter((l) => b.label_ids.includes(l.id)) });
  return {
    async ensureProfile(u) {
      if (!profiles.has(u.id)) {
        const [first, ...rest] = u.name.split(" ");
        profiles.set(u.id, { user_id: u.id, username: slugify(u.name), first_name: first, last_name: rest.join(" "), bio: "", location: null, website: null, avatar_image: null, cover_image: null, updated_at: "now" });
      }
      return profiles.get(u.id);
    },
    async updateProfile(uid, p) {
      if (p.username && [...profiles.values()].some((x) => x.user_id !== uid && x.username === p.username)) throw new ConflictError("taken");
      Object.assign(profiles.get(uid), p);
      return profiles.get(uid);
    },
    async listLabels(uid) { return labels.filter((l) => l.user_id === uid).map((l) => ({ ...l, bookmark_count: 0 })); },
    async countLabels(uid) { return labels.filter((l) => l.user_id === uid).length; },
    async findLabel(i) { return labels.find((l) => l.id === i) ?? null; },
    async createLabel(uid, l) {
      if (dup(labels, uid, l.name)) throw new ConflictError("dup");
      const row = { id: id(), user_id: uid, ...l, created_at: "now" };
      labels.push(row);
      return row;
    },
    async updateLabel(i, p) { return Object.assign(labels.find((l) => l.id === i), p); },
    async removeLabel(i) { labels.splice(labels.findIndex((l) => l.id === i), 1); return true; },
    async ownedLabelIds(uid, ids) { return labels.filter((l) => l.user_id === uid && ids.includes(l.id)).map((l) => l.id); },
    async listLists(uid) { return lists.filter((l) => l.user_id === uid).map((l) => ({ ...l, bookmark_count: 0 })); },
    async countLists(uid) { return lists.filter((l) => l.user_id === uid).length; },
    async findList(i) { return lists.find((l) => l.id === i) ?? null; },
    async createList(uid, l) {
      if (dup(lists, uid, l.name)) throw new ConflictError("dup");
      const row = { id: id(), user_id: uid, ...l, created_at: "now" };
      lists.push(row);
      return row;
    },
    async updateList(i, p) { return Object.assign(lists.find((l) => l.id === i), p); },
    async removeList(i) { lists.splice(lists.findIndex((l) => l.id === i), 1); return true; },
    async ownedListId(uid, i) { return lists.find((l) => l.id === i && l.user_id === uid)?.id ?? null; },
    async listBookmarks(uid, f) {
      return bookmarks.filter((b) => b.user_id === uid && (!f.listId || b.list_id === f.listId) && (!f.search || b.title.includes(f.search))).map(view);
    },
    async countBookmarks(uid) { return bookmarks.filter((b) => b.user_id === uid).length; },
    async findBookmark(i) { const b = bookmarks.find((x) => x.id === i); return b ? view(b) : null; },
    async captionForUser(uid, cid) { return uid === U1.id && cid === CAP ? { id: CAP, caption: "A river bend with farmland.", lat: 12.5, lon: 77.5 } : uid === U1.id && cid === CAP2 ? { id: CAP2, caption: "A newer view.", lat: 12.5002, lon: 77.5001 } : null; },
    async createBookmark(uid, b) {
      if (b.caption_id && bookmarks.some((x) => x.user_id === uid && x.caption_id === b.caption_id)) throw new ConflictError("dup");
      const row = { id: id(), user_id: uid, ...b, created_at: "now" };
      bookmarks.push(row);
      return view(row);
    },
    async findNearbyBookmark(uid, lat, lon, excl = null) {
      const b = bookmarks.find((x) => x.user_id === uid && x.id !== excl && isNearby({ lat, lon }, x));
      return b ? view(b) : null;
    },
    async findBookmarkByCaption(uid, cid, excl = null) {
      const b = bookmarks.find((x) => x.user_id === uid && x.caption_id === cid && x.id !== excl);
      return b ? view(b) : null;
    },
    async mergeDuplicates(uid) {
      const plans = planMerges(bookmarks.filter((b) => b.user_id === uid));
      for (const plan of plans) {
        for (const id of plan.remove_ids) bookmarks.splice(bookmarks.findIndex((b) => b.id === id), 1);
        Object.assign(bookmarks.find((b) => b.id === plan.keeper_id), plan.patch);
      }
      return { removed: plans.reduce((n, p) => n + p.remove_ids.length, 0), places: plans.length };
    },
    async updateBookmark(i, p) { const b = bookmarks.find((x) => x.id === i); Object.assign(b, p); return view(b); },
    async removeBookmark(i) { bookmarks.splice(bookmarks.findIndex((b) => b.id === i), 1); return true; },
    async records() { return { counts: { captions: 0, monitored_locations: 0, update_runs: 0, bookmarks: bookmarks.length, lists: lists.length, labels: labels.length }, recent: [] }; },
  };
}

async function start() {
  const library = fakeLibrary();
  const users = { async findById(i) { return [U1, U2].find((u) => u.id === i) ?? null; } };
  const app = createApp({ config, checks: {}, providers: new Map(), routers: [{ path: "/api", router: createLibraryRouter({ config, library, users }) }] });
  const server = app.listen(0);
  const base = `http://localhost:${server.address().port}`;
  const call = (user) => async (method, path, body) => {
    const res = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json", ...(user ? { Authorization: `Bearer ${signToken(user, config)}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    return { status: res.status, body: text ? JSON.parse(text) : null };
  };
  return { ada: call(U1), bob: call(U2), anon: call(null), library, close: () => server.close() };
}

test("library routes require sign-in", async () => {
  const s = await start();
  for (const p of ["/api/library/profile", "/api/library/bookmarks", "/api/library/labels", "/api/library/lists", "/api/library/records"]) {
    assert.equal((await s.anon("GET", p)).status, 401, p);
  }
  s.close();
});

const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

test("profile is created from the account name on first read, then edited", async () => {
  const s = await start();
  const first = await s.ada("GET", "/api/library/profile");
  assert.equal(first.status, 200);
  const p = first.body.profile;
  assert.equal(p.username, "ada-lovelace");
  assert.equal(p.first_name, "Ada");
  assert.equal(p.last_name, "Lovelace");
  assert.equal(p.email, "ada@example.com");
  assert.equal(p.joined_at, "2026-01-01T00:00:00Z");
  assert.equal(p.location, "");
  assert.equal(p.website, "");
  assert.equal("user_id" in p, false);
  assert.equal("readme" in p, false);
  const put = await s.ada("PUT", "/api/library/profile", { bio: "Mapping rivers", location: "Bengaluru", website: "https://ada.dev", avatar_image: PNG, cover_image: PNG });
  assert.equal(put.status, 200);
  assert.equal(put.body.profile.bio, "Mapping rivers");
  assert.equal(put.body.profile.avatar_image, PNG);
  const cleared = await s.ada("PUT", "/api/library/profile", { avatar_image: null });
  assert.equal(cleared.body.profile.avatar_image, null);
  s.close();
});

test("profile validation, image checks and username conflicts", async () => {
  const s = await start();
  await s.ada("GET", "/api/library/profile");
  await s.bob("GET", "/api/library/profile");
  assert.equal((await s.ada("PUT", "/api/library/profile", { username: "-bad-" })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { first_name: "  " })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { website: "javascript:alert(1)" })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { bio: "x".repeat(301) })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { readme: "old" })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { avatar_image: "https://evil.example/a.png" })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { avatar_image: "data:image/svg+xml;base64,PHN2Zz4=" })).status, 400);
  assert.equal((await s.ada("PUT", "/api/library/profile", { avatar_image: "data:image/png;base64," + "A".repeat(150_001) })).status, 400);
  const taken = await s.bob("PUT", "/api/library/profile", { username: "ada-lovelace" });
  assert.equal(taken.status, 409);
  assert.equal(taken.body.error.code, "username_taken");
  s.close();
});

test("each person only sees their own profile", async () => {
  const s = await start();
  await s.ada("PUT", "/api/library/profile", { bio: "ada bio" });
  assert.equal((await s.bob("GET", "/api/library/profile")).body.profile.bio, "");
  assert.equal((await s.anon("GET", "/api/profiles/ada-lovelace")).status, 404);
  s.close();
});

test("labels and lists: create, duplicate, rename, delete, ownership", async () => {
  const s = await start();
  const l = await s.ada("POST", "/api/library/labels", { name: "Floods", color: "#ff0000" });
  assert.equal(l.status, 201);
  assert.equal((await s.ada("POST", "/api/library/labels", { name: "floods" })).status, 409);
  assert.equal((await s.ada("POST", "/api/library/labels", { name: "x", color: "red" })).status, 400);
  assert.equal((await s.bob("PATCH", `/api/library/labels/${l.body.label.id}`, { name: "Mine" })).status, 404);
  assert.equal((await s.ada("PATCH", `/api/library/labels/${l.body.label.id}`, { name: "Wildfires" })).body.label.name, "Wildfires");
  assert.equal((await s.ada("DELETE", `/api/library/labels/${l.body.label.id}`)).status, 204);
  const list = await s.ada("POST", "/api/library/lists", { name: "Farmland" });
  assert.equal(list.status, 201);
  assert.equal((await s.ada("POST", "/api/library/lists", { name: "FARMLAND" })).status, 409);
  assert.equal((await s.ada("GET", "/api/library/lists/not-a-uuid")).status, 404);
  assert.equal((await s.ada("DELETE", "/api/library/lists/not-a-uuid")).status, 400);
  s.close();
});

test("bookmarks: manual, from a caption, labels, lists, ownership", async () => {
  const s = await start();
  const label = (await s.ada("POST", "/api/library/labels", { name: "Rivers" })).body.label;
  const list = (await s.ada("POST", "/api/library/lists", { name: "Trip" })).body.list;
  const manual = await s.ada("POST", "/api/library/bookmarks", { title: "Delhi", lat: 28.6, lon: 77.2, list_id: list.id, label_ids: [label.id] });
  assert.equal(manual.status, 201);
  assert.equal(manual.body.bookmark.labels[0].name, "Rivers");
  assert.deepEqual(manual.body.bookmark.location, { lat: 28.6, lon: 77.2 });

  const fromCaption = await s.ada("POST", "/api/library/bookmarks", { caption_id: CAP });
  assert.equal(fromCaption.status, 201);
  assert.equal(fromCaption.body.bookmark.title, "A river bend with farmland.");
  assert.deepEqual(fromCaption.body.bookmark.location, { lat: 12.5, lon: 77.5 });
  assert.equal((await s.ada("POST", "/api/library/bookmarks", { caption_id: CAP })).status, 409);

  assert.equal((await s.bob("POST", "/api/library/bookmarks", { caption_id: CAP })).status, 404);
  assert.equal((await s.bob("POST", "/api/library/bookmarks", { title: "x", list_id: list.id })).status, 404);
  assert.equal((await s.bob("POST", "/api/library/bookmarks", { title: "x", label_ids: [label.id] })).status, 404);
  assert.equal((await s.ada("POST", "/api/library/bookmarks", { lat: 1, lon: 2 })).status, 400);
  assert.equal((await s.ada("POST", "/api/library/bookmarks", { title: "x", lat: 95, lon: 2 })).status, 400);
  assert.equal((await s.ada("POST", "/api/library/bookmarks", { title: "x", lat: 5 })).status, 400);

  assert.equal((await s.ada("GET", "/api/library/bookmarks")).body.items.length, 2);
  assert.equal((await s.bob("GET", "/api/library/bookmarks")).body.items.length, 0);
  assert.equal((await s.ada("GET", `/api/library/bookmarks?list_id=${list.id}`)).body.items.length, 1);

  const id = manual.body.bookmark.id;
  assert.equal((await s.bob("PATCH", `/api/library/bookmarks/${id}`, { title: "hack" })).status, 404);
  assert.equal((await s.bob("DELETE", `/api/library/bookmarks/${id}`)).status, 404);
  const upd = await s.ada("PATCH", `/api/library/bookmarks/${id}`, { note: "Check in spring", label_ids: [] });
  assert.equal(upd.body.bookmark.note, "Check in spring");
  assert.equal(upd.body.bookmark.labels.length, 0);
  assert.equal((await s.ada("DELETE", `/api/library/bookmarks/${id}`)).status, 204);
  s.close();
});

test("records endpoint returns counts and recent activity", async () => {
  const s = await start();
  const r = await s.ada("GET", "/api/library/records");
  assert.equal(r.status, 200);
  assert.equal(r.body.counts.bookmarks, 0);
  assert.deepEqual(r.body.recent, []);
  s.close();
});

test("slugify makes safe usernames", () => {
  assert.equal(slugify("Ada Lovelace"), "ada-lovelace");
  assert.match(slugify("!!"), /^user-/);
  assert.ok(slugify("A".repeat(80)).length <= 30);
});

test("places: about 55 m counts as the same place, further does not", () => {
  const here = { lat: 12.9, lon: 77.6 };
  assert.equal(isNearby(here, { lat: 12.9003, lon: 77.6003 }), true);
  assert.equal(isNearby(here, { lat: 12.9006, lon: 77.6 }), false);
  assert.equal(isNearby(here, { lat: 12.9, lon: 77.6011 }), false);
  assert.equal(isNearby(here, { lat: null, lon: null }), false);
  // near the poles a degree of longitude is short, so the allowed gap grows
  assert.equal(isNearby({ lat: 80, lon: 10 }, { lat: 80, lon: 10.002 }), true);
});

test("one bookmark per place: a second one at the same place is refused and points at the first", async () => {
  const s = await start();
  const first = await s.ada("POST", "/api/library/bookmarks", { title: "Alliance University", lat: 12.8, lon: 77.7 });
  assert.equal(first.status, 201);
  const again = await s.ada("POST", "/api/library/bookmarks", { title: "Same place", lat: 12.8002, lon: 77.7001 });
  assert.equal(again.status, 409);
  assert.equal(again.body.error.code, "duplicate_location");
  assert.equal(again.body.bookmark.id, first.body.bookmark.id);
  assert.equal((await s.ada("GET", "/api/library/bookmarks")).body.items.length, 1);
  const elsewhere = await s.ada("POST", "/api/library/bookmarks", { title: "Far away", lat: 13.5, lon: 77.7 });
  assert.equal(elsewhere.status, 201);
  // someone else may bookmark the same place
  assert.equal((await s.bob("POST", "/api/library/bookmarks", { title: "Alliance too", lat: 12.8, lon: 77.7 })).status, 201);
  s.close();
});

test("a caption at a place that is already bookmarked is refused; a caption is attached to the existing bookmark instead", async () => {
  const s = await start();
  const manual = await s.ada("POST", "/api/library/bookmarks", { title: "Alliance University", lat: 12.5, lon: 77.5, note: "visit" });
  const refused = await s.ada("POST", "/api/library/bookmarks", { caption_id: CAP });
  assert.equal(refused.status, 409);
  assert.equal(refused.body.bookmark.id, manual.body.bookmark.id);
  const attached = await s.ada("PATCH", `/api/library/bookmarks/${manual.body.bookmark.id}`, { caption_id: CAP });
  assert.equal(attached.status, 200);
  assert.equal(attached.body.bookmark.caption.id, CAP);
  assert.equal(attached.body.bookmark.title, "Alliance University");
  assert.equal(attached.body.bookmark.note, "visit");
  // the same caption again is the same bookmark; a second caption does not replace the first
  assert.equal((await s.ada("POST", "/api/library/bookmarks", { caption_id: CAP })).status, 409);
  const second = await s.ada("PATCH", `/api/library/bookmarks/${manual.body.bookmark.id}`, { caption_id: CAP2 });
  assert.equal(second.body.bookmark.caption.id, CAP);
  assert.equal((await s.ada("GET", "/api/library/bookmarks")).body.items.length, 1);
  s.close();
});

test("nearby lookup finds my bookmark at a place, and nobody else's", async () => {
  const s = await start();
  await s.ada("POST", "/api/library/bookmarks", { title: "Lake", lat: 12.9, lon: 77.6 });
  const hit = await s.ada("GET", "/api/library/bookmarks/nearby?lat=12.9001&lon=77.6001");
  assert.equal(hit.body.bookmark.title, "Lake");
  assert.equal((await s.ada("GET", "/api/library/bookmarks/nearby?lat=20&lon=77.6")).body.bookmark, null);
  assert.equal((await s.bob("GET", "/api/library/bookmarks/nearby?lat=12.9&lon=77.6")).body.bookmark, null);
  assert.equal((await s.ada("GET", "/api/library/bookmarks/nearby?lat=abc&lon=1")).status, 400);
  assert.equal((await s.anon("GET", "/api/library/bookmarks/nearby?lat=1&lon=1")).status, 401);
  s.close();
});

test("moving a bookmark onto another bookmark's place is refused", async () => {
  const s = await start();
  await s.ada("POST", "/api/library/bookmarks", { title: "A", lat: 10, lon: 10 });
  const b = await s.ada("POST", "/api/library/bookmarks", { title: "B", lat: 11, lon: 11 });
  const clash = await s.ada("PATCH", `/api/library/bookmarks/${b.body.bookmark.id}`, { lat: 10.0001, lon: 10.0001 });
  assert.equal(clash.status, 409);
  const fine = await s.ada("PATCH", `/api/library/bookmarks/${b.body.bookmark.id}`, { lat: 11.0001, lon: 11.0001 });
  assert.equal(fine.status, 200);
  s.close();
});

test("planMerges keeps the oldest bookmark at a place and fills in what it lacks", () => {
  const rows = [
    { id: "late", lat: 1, lon: 1, caption_id: "c1", list_id: "f1", note: "from caption", created_at: "2026-02-01" },
    { id: "old", lat: 1.0001, lon: 1.0001, caption_id: null, list_id: null, note: "my note", created_at: "2026-01-01" },
    { id: "far", lat: 5, lon: 5, caption_id: null, list_id: null, note: "", created_at: "2026-01-05" },
    { id: "nowhere", lat: null, lon: null, caption_id: null, list_id: null, note: "", created_at: "2026-01-06" },
  ];
  const plans = planMerges(rows);
  assert.equal(plans.length, 1);
  assert.equal(plans[0].keeper_id, "old");
  assert.deepEqual(plans[0].remove_ids, ["late"]);
  assert.deepEqual(plans[0].patch, { caption_id: "c1", list_id: "f1", note: "my note\n\nfrom caption" });
  assert.deepEqual(planMerges([rows[2], rows[3]]), []);
  // an existing caption or folder is never replaced, and an identical note is not repeated
  const keep = planMerges([
    { id: "a", lat: 2, lon: 2, caption_id: "ca", list_id: "fa", note: "same", created_at: "2026-01-01" },
    { id: "b", lat: 2, lon: 2, caption_id: "cb", list_id: "fb", note: "same", created_at: "2026-01-02" },
  ]);
  assert.deepEqual(keep[0].patch, {});
});

test("merge-duplicates cleans up duplicates saved before the one-per-place rule, and reports what it did", async () => {
  const s = await start();
  // legacy data: written straight into the store, bypassing the route's check
  const old = await s.library.createBookmark(U1.id, { title: "Alliance (map)", note: "", lat: 12.8, lon: 77.7, caption_id: null, list_id: null, label_ids: [] });
  await s.library.createBookmark(U1.id, { title: "Alliance (caption)", note: "from caption", lat: 12.8001, lon: 77.7001, caption_id: CAP, list_id: null, label_ids: [] });
  await s.library.createBookmark(U1.id, { title: "Elsewhere", note: "", lat: 40, lon: 40, caption_id: null, list_id: null, label_ids: [] });
  assert.equal((await s.ada("GET", "/api/library/bookmarks")).body.items.length, 3);
  const merged = await s.ada("POST", "/api/library/bookmarks/merge-duplicates");
  assert.deepEqual(merged.body, { removed: 1, places: 1 });
  const after = (await s.ada("GET", "/api/library/bookmarks")).body.items;
  assert.equal(after.length, 2);
  const kept = after.find((b) => b.id === old.id);
  assert.equal(kept.caption.id, CAP);
  assert.equal(kept.note, "from caption");
  assert.deepEqual((await s.ada("POST", "/api/library/bookmarks/merge-duplicates")).body, { removed: 0, places: 0 });
  assert.equal((await s.anon("POST", "/api/library/bookmarks/merge-duplicates")).status, 401);
  assert.deepEqual((await s.bob("POST", "/api/library/bookmarks/merge-duplicates")).body, { removed: 0, places: 0 });
  s.close();
});
