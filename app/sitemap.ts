import type { MetadataRoute } from "next";
import { getDestinations, getPackages } from "@/lib/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://crystalworldturismo.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, destinations] = await Promise.all([getPackages(), getDestinations()]);
  const pages = ["", "/pacotes", "/destinos", "/viagem-personalizada", "/sobre", "/depoimentos", "/contato"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...packages.map((p) => ({ url: `${BASE}/pacotes/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...destinations.map((d) => ({ url: `${BASE}/destinos/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
