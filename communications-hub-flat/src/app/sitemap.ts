import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const routes = ["", "/services/monday-demo", "/services/bicaradana", "/services/internal-announcement", "/services/communication-support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${SITE.url}${r}`, lastModified: new Date(), changeFrequency: "monthly", priority: r === "" ? 1 : 0.8 }));
}
