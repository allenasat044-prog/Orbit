import { useEffect, useState, useSyncExternalStore } from "react";
import { getToken, logout, subscribeAuth } from "@/lib/auth";
import { api, type Profile } from "@/lib/library";

export type Me = { firstName: string; name: string; username: string; avatar: string | null };

let profileVersion = 0;
const profileListeners = new Set<() => void>();
/** Call after the profile was edited, so the header shows the new name and picture. */
export const notifyProfileChanged = () => {
  profileVersion++;
  profileListeners.forEach((l) => l());
};
const subscribeProfile = (cb: () => void) => {
  profileListeners.add(cb);
  return () => { profileListeners.delete(cb); };
};

/**
 * Who is logged in. `signedIn` is known at once (a token exists); `me` follows after the profile loads.
 * A token that the server no longer accepts logs the person out, so the header never claims a stale login.
 */
export function useAuth() {
  const token = useSyncExternalStore(subscribeAuth, getToken, () => null);
  const version = useSyncExternalStore(subscribeProfile, () => profileVersion, () => 0);
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    if (!token) { setMe(null); return; }
    let live = true;
    void api<{ profile: Profile }>("GET", "/api/library/profile").then((r) => {
      if (!live) return;
      if (r.ok) {
        const p = r.data.profile;
        setMe({ firstName: p.first_name || p.username, name: [p.first_name, p.last_name].filter(Boolean).join(" ") || p.username, username: p.username, avatar: p.avatar_image });
      } else if (r.status === 401) logout();
    });
    return () => { live = false; };
  }, [token, version]);

  return { signedIn: Boolean(token), me, logout };
}
