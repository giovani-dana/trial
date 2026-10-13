export function buildMailto(opts: { to: string; subject: string; body?: string }) {
  const params = [`subject=${encodeURIComponent(opts.subject)}`];
  if (opts.body) params.push(`body=${encodeURIComponent(opts.body.replace(/\n/g, "\r\n"))}`);
  return `mailto:${opts.to}?${params.join("&")}`;
}

export function templateToBody(fields: readonly string[], values: Record<string, string> = {}) {
  return fields.map((f) => `${f}: ${values[f] ?? ""}`).join("\n\n");
}
