import { SEARCH_INDEX, type IndexEntry } from "./search-index";
import { SERVICES, type Service } from "./services";

export interface ServiceMatch { service: Service; score: number; matched: string[] }
export interface LinkMatch { entry: IndexEntry; score: number; matched: string[] }

const STOP = new Set(["i", "a", "an", "the", "to", "at", "for", "my", "me", "of", "in", "on", "and", "or", "is", "it", "want", "need", "help", "with", "about", "got", "have", "how", "do", "can", "get"]);

export function normalise(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function withinOneEdit(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (a.length < b.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function prepare(raw: string) {
  const q = normalise(raw);
  if (q.length < 2) return null;
  const tokens = q.split(" ").filter((t) => t && !STOP.has(t));
  return tokens.length ? { q, tokens } : null;
}

/** Query terms worth highlighting in result titles. */
export function queryTerms(raw: string) {
  return prepare(raw)?.tokens.filter((t) => t.length >= 2) ?? [];
}

/**
 * Shared scorer for services and deep links.
 * - phrase keywords (contain a space): substring match on the normalised query
 * - word keywords: token-prefix match (so "speak" matches speaker / speaking), plus one-typo tolerance
 */
function score(q: string, tokens: string[], title: string, keywords: string[]) {
  let s = 0;
  const matched = new Set<string>();
  if (q.includes(normalise(title))) { s += 6; matched.add(title); }
  for (const kw of keywords) {
    if (kw.includes(" ")) {
      if (` ${q} `.includes(` ${kw} `) || q.includes(kw)) { s += 3 + kw.split(" ").length; matched.add(kw); }
      continue;
    }
    for (const t of tokens) {
      if (t === kw) { s += 3; matched.add(kw); }
      else if (kw.length >= 5 && t.length >= 5 && withinOneEdit(t, kw.slice(0, t.length >= kw.length ? kw.length : t.length + 1))) { s += 2; matched.add(kw); }
      else if (t.length >= 3 && (t.startsWith(kw) || (kw.startsWith(t) && t.length >= 4))) { s += kw.length >= 5 ? 3 : 2; matched.add(kw); }
    }
  }
  return { score: s, matched: [...matched] };
}

export function searchServices(raw: string): ServiceMatch[] {
  const p = prepare(raw);
  if (!p) return [];
  return SERVICES.map((service) => ({ service, ...score(p.q, p.tokens, service.title, service.keywords) }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function searchLinks(raw: string, limit = 6): LinkMatch[] {
  const p = prepare(raw);
  if (!p) return [];
  return SEARCH_INDEX.map((entry) => ({ entry, ...score(p.q, p.tokens, entry.title, entry.keywords) }))
    .filter((m) => m.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
