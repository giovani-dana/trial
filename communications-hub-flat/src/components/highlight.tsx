import { Fragment } from "react";

/** Wraps occurrences of any term in <mark>. */
export function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const clean = terms.filter((t) => t.length >= 2).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!clean.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${clean.join("|")})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? <mark key={i} className="rounded bg-brand-100 px-0.5 text-brand-900">{p}</mark> : <Fragment key={i}>{p}</Fragment>
      )}
    </>
  );
}
