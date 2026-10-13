import "server-only";
import { cache } from "react";
import seed from "@/data/seed.json";
import { client } from "@/sanity/client";
import { sanityEnabled } from "@/sanity/env";
import type { Destination, SiteSettings, Testimonial, TravelPackage } from "./types";

/** Seconds before Sanity content is refetched (the /api/revalidate webhook makes it instant). */
const REVALIDATE = 300;

async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  return client.fetch<T>(groq, params, { next: { revalidate: REVALIDATE, tags: ["sanity"] } });
}

const packageFields = `
  "slug": slug.current, title, "destinationSlug": destination->slug.current, scope,
  "categories": coalesce(categories, []), startDate, endDate, nights, departureCity, summary,
  "included": coalesce(included, []), hotel, hotelDescription, priceFrom, priceNote, paymentConditions,
  "importantInfo": coalesce(importantInfo, []), "images": images[].asset->url, "featured": coalesce(featured, false)
`;

const destinationFields = `
  "slug": slug.current, name, scope, subtitle, "image": image.asset->url, "categories": coalesce(categories, []),
  why, "highlights": coalesce(highlights, []), bestTime,
  "experiences": coalesce(experiences[]{title, text, "image": image.asset->url}, [])
`;

const today = () => new Date().toISOString().slice(0, 10);
const byStart = (a: TravelPackage, b: TravelPackage) => a.startDate.localeCompare(b.startDate);

/** Active packages whose return date has not passed, ordered by departure. */
export const getPackages = cache(async (): Promise<TravelPackage[]> => {
  if (!sanityEnabled) {
    return (seed.packages as TravelPackage[]).filter((p) => p.endDate >= today()).sort(byStart);
  }
  return query<TravelPackage[]>(
    `*[_type == "travelPackage" && active != false && endDate >= $today] | order(startDate asc) { ${packageFields} }`,
    { today: today() },
  );
});

export async function getFeaturedPackages() {
  return (await getPackages()).filter((p) => p.featured).slice(0, 6);
}

export async function getPackage(slug: string) {
  return (await getPackages()).find((p) => p.slug === slug);
}

export const getDestinations = cache(async (): Promise<Destination[]> => {
  if (!sanityEnabled) return seed.destinations as Destination[];
  return query<Destination[]>(`*[_type == "destination"] | order(name asc) { ${destinationFields} }`);
});

export async function getDestination(slug: string) {
  return (await getDestinations()).find((d) => d.slug === slug);
}

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!sanityEnabled) return seed.testimonials;
  return query<Testimonial[]>(
    `*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt desc) { name, destination, text, "image": image.asset->url }`,
  );
});

export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!sanityEnabled) return seed.settings;
  const s = await query<SiteSettings | null>(`*[_id == "siteSettings"][0]`);
  return { ...seed.settings, ...stripEmpty(s ?? {}) };
});

function stripEmpty<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== "")) as Partial<T>;
}
