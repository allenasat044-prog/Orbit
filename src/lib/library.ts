import { getToken } from "@/lib/auth";

export type Label = { id: string; name: string; color: string; bookmark_count?: number };
export type ListItem = { id: string; name: string; description: string; bookmark_count?: number };
export type Bookmark = {
  id: string;
  title: string;
  note: string;
  location: { lat: number; lon: number } | null;
  caption: { id: string; text: string; image_url: string | null } | null;
  list_id: string | null;
  labels?: Label[];
  created_at: string;
};
export type Profile = {
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  website: string;
  avatar_image: string | null;
  cover_image: string | null;
  email: string;
  joined_at: string;
  updated_at: string;
};
export type Records = {
  counts: Record<"captions" | "monitored_locations" | "update_runs" | "bookmarks" | "lists" | "labels", number>;
  recent: { kind: string; id: string; title: string; at: string }[];
};

// Not a discriminated union on purpose: this project compiles with strict:false, where narrowing on `ok` does not work.
export type ApiResult<T> = { ok: boolean; status: number; error: string; data: T; /** The raw error answer, when the server sent extra details (for example the existing bookmark). */ body?: any };

export async function api<T = unknown>(method: string, path: string, body?: unknown, auth = true): Promise<ApiResult<T>> {
  const token = getToken();
  if (auth && !token) return { ok: false, status: 401, error: "Please log in first.", data: undefined as T };
  try {
    const res = await fetch(path, {
      method,
      headers: { ...(body !== undefined ? { "Content-Type": "application/json" } : {}), ...(auth && token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (res.status === 204) return { ok: true, status: 204, error: "", data: undefined as T };
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, status: res.status, data: undefined as T, body: data, error: res.status === 401 && auth ? "Your session has expired. Please log in again." : data?.error?.message ?? `Request failed (${res.status})` };
    }
    return { ok: true, status: res.status, error: "", data: data as T };
  } catch {
    return { ok: false, status: 0, data: undefined as T, error: "Can't reach the server. Is the backend running on port 3000?" };
  }
}
