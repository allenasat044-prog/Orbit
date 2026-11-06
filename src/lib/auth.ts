const TOKEN_KEY = "orbit_token";
const EVENT = "orbit-auth";

/** Tells every part of the page that the login state (or the profile shown in the header) changed. */
export const notifyAuthChanged = () => window.dispatchEvent(new Event(EVENT));

/** For useSyncExternalStore: re-render when someone logs in or out, here or in another tab. */
export function subscribeAuth(callback: () => void) {
  window.addEventListener(EVENT, callback);
  const onStorage = (e: StorageEvent) => { if (e.key === TOKEN_KEY || e.key === null) callback(); };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

export type AuthResult = { ok: boolean; error?: string };

async function post(path: string, body: Record<string, string>): Promise<AuthResult> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error?.message ?? data.message ?? `Request failed (${res.status})` };
    }
    if (data.token) setToken(data.token);
    return { ok: true };
  } catch {
    return { ok: false, error: "Can't reach the server. Is the backend running on port 3000?" };
  }
}

export const login = (email: string, password: string) =>
  post("/api/auth/login", { email, password });

export const signup = (name: string, email: string, password: string) =>
  post("/api/auth/signup", { name, email, password });

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChanged();
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  notifyAuthChanged();
};
