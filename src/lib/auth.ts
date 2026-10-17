const TOKEN_KEY = "orbit_token";

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
    if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
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

export const logout = () => localStorage.removeItem(TOKEN_KEY);
