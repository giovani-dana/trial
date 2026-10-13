const KEY = "comms-hub:recent";
const MAX = 5;

export function getRecents(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, MAX) : [];
  } catch { return []; }
}

export function addRecent(q: string) {
  const t = q.trim();
  if (t.length < 3) return;
  try {
    const next = [t, ...getRecents().filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch { /* storage unavailable */ }
}

export function clearRecents() {
  try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}
