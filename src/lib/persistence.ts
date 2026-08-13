// ── Hybrid identifier persistence ────────────────────────────────────────────
// Writes the visitor id into every client store available, reads it back from
// whichever one still has it, and re-seeds the stores that lost it.
//
// The point is redundancy: clearing cookies does not clear localStorage,
// clearing site data does not always clear IndexedDB in every browser, and the
// fingerprint hash from `./fingerprint` stands in when all of them are gone.
//
// Read this plainly, because it is what the code does: an id cleared from one
// store is repopulated from the others on the next page load. That is the
// intended behaviour of a hybrid store, and it is the reason `/legal` §04 tells
// visitors the identifier is durable and tells them how to actually reset it
// (clear all site data, which drops every layer at once, or use a browser that
// randomises the fingerprint surfaces). A durable identifier that is documented
// is a product decision; an undocumented one that silently outlives a deletion
// the visitor believed in is the thing that has drawn enforcement, so keep that
// section accurate whenever this file changes.

const KEY = "bi_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // 400d, the Chrome cookie ceiling
const DB_NAME = "bi_store";
const DB_STORE = "identity";

export type StoreName =
  | "cookie"
  | "localStorage"
  | "sessionStorage"
  | "indexedDB";

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

// ── Individual stores ────────────────────────────────────────────────────────

function readCookie(): string | null {
  return safe(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${KEY}=([^;]*)`),
    );
    return match ? decodeURIComponent(match[1]) : null;
  }, null);
}

function writeCookie(value: string) {
  safe(() => {
    // Not HttpOnly on purpose: this layer has to be readable by the client to
    // participate in the cross-store restore. The server-side seen-cookie in
    // `./visit-notify.server` stays HttpOnly and is a separate thing.
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${KEY}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  }, undefined);
}

function readLocal(): string | null {
  return safe(() => localStorage.getItem(KEY), null);
}

function writeLocal(value: string) {
  safe(() => localStorage.setItem(KEY, value), undefined);
}

function readSession(): string | null {
  return safe(() => sessionStorage.getItem(KEY), null);
}

function writeSession(value: string) {
  safe(() => sessionStorage.setItem(KEY, value), undefined);
}

/** Promisified IndexedDB. Resolves null on any failure - private mode, quota, blocked. */
function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      if (typeof indexedDB === "undefined") return resolve(null);
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(DB_STORE))
          db.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
      // Firefox private mode never settles either handler; do not hang the flush.
      setTimeout(() => resolve(null), 1500);
    } catch {
      resolve(null);
    }
  });
}

async function readIdb(): Promise<string | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(DB_STORE, "readonly");
      const request = tx.objectStore(DB_STORE).get(KEY);
      request.onsuccess = () =>
        resolve(typeof request.result === "string" ? request.result : null);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeIdb(value: string): Promise<void> {
  const db = await openDb();
  if (!db) return;
  safe(() => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(value, KEY);
  }, undefined);
}

// ── Coordination ─────────────────────────────────────────────────────────────

export interface PersistedIdentity {
  id: string;
  /** Stores that already held the id on arrival. Empty means a new visitor. */
  found: StoreName[];
  /** Stores that were missing it and have now been re-seeded. */
  restored: StoreName[];
  /** True when at least one store had it but at least one did not. */
  partial: boolean;
}

/**
 * Resolve the durable id.
 *
 * `fallback` is the fingerprint hash from `./fingerprint`, used only when no
 * store holds anything - so a visitor who has cleared everything is recognised
 * by device traits rather than being treated as brand new.
 *
 * Precedence is longest-lived first: a cookie and localStorage both outlive the
 * tab, sessionStorage does not, so it never wins a disagreement.
 */
export async function persistIdentity(
  fallback: string,
): Promise<PersistedIdentity | undefined> {
  if (typeof window === "undefined") return undefined;

  const [cookie, local, session, idb] = await Promise.all([
    Promise.resolve(readCookie()),
    Promise.resolve(readLocal()),
    Promise.resolve(readSession()),
    readIdb(),
  ]);

  const present: Array<[StoreName, string | null]> = [
    ["localStorage", local],
    ["indexedDB", idb],
    ["cookie", cookie],
    ["sessionStorage", session],
  ];

  const found = present.filter(([, v]) => v !== null).map(([n]) => n);
  const id = present.find(([, v]) => v !== null)?.[1] ?? fallback;

  const restored: StoreName[] = [];
  for (const [name, value] of present) {
    if (value === id) continue;
    restored.push(name);
    if (name === "cookie") writeCookie(id);
    else if (name === "localStorage") writeLocal(id);
    else if (name === "sessionStorage") writeSession(id);
    else await writeIdb(id);
  }

  return {
    id,
    found,
    restored,
    partial: found.length > 0 && restored.length > 0,
  };
}

/**
 * Drop the id from every layer. Wired to the opt-out link in `/legal` so the
 * page's claim that a visitor can reset this is actually true.
 */
export async function clearIdentity(): Promise<void> {
  if (typeof window === "undefined") return;
  safe(() => {
    document.cookie = `${KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
  }, undefined);
  safe(() => localStorage.removeItem(KEY), undefined);
  safe(() => sessionStorage.removeItem(KEY), undefined);
  const db = await openDb();
  if (db)
    safe(() => {
      db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).delete(KEY);
    }, undefined);
}
