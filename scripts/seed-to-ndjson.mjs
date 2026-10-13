// Converte data/seed.json em um arquivo NDJSON para importar no Sanity:
//   node scripts/seed-to-ndjson.mjs
//   npx sanity dataset import seed.ndjson production
// As fotos (URLs) são baixadas e enviadas ao Sanity automaticamente pelo import.
import { readFileSync, writeFileSync } from "node:fs";

const seed = JSON.parse(readFileSync(new URL("../data/seed.json", import.meta.url), "utf8"));

const image = (url) => url && { _type: "image", _sanityAsset: `image@${url}?w=2000&q=85` };
const slug = (current) => ({ _type: "slug", current });
const key = (i) => `k${i}`;

const docs = [
  { _id: "siteSettings", _type: "siteSettings", ...seed.settings },
  ...seed.destinations.map((d) => ({
    _id: `destination-${d.slug}`,
    _type: "destination",
    name: d.name,
    slug: slug(d.slug),
    scope: d.scope,
    subtitle: d.subtitle,
    image: image(d.image),
    categories: d.categories,
    why: d.why,
    highlights: d.highlights,
    bestTime: d.bestTime,
    experiences: d.experiences.map((e, i) => ({ _key: key(i), title: e.title, text: e.text, image: image(e.image) })),
  })),
  ...seed.packages.map((p) => ({
    _id: `package-${p.slug}`,
    _type: "travelPackage",
    title: p.title,
    slug: slug(p.slug),
    active: true,
    featured: p.featured,
    scope: p.scope,
    categories: p.categories,
    destination: p.destinationSlug ? { _type: "reference", _ref: `destination-${p.destinationSlug}` } : undefined,
    startDate: p.startDate,
    endDate: p.endDate,
    nights: p.nights,
    departureCity: p.departureCity,
    summary: p.summary,
    images: p.images.map((url, i) => ({ _key: key(i), ...image(url) })),
    included: p.included,
    hotel: p.hotel,
    hotelDescription: p.hotelDescription,
    priceFrom: p.priceFrom,
    priceNote: p.priceNote,
    paymentConditions: p.paymentConditions,
    importantInfo: p.importantInfo,
  })),
  ...seed.testimonials.map((t, i) => ({ _id: `testimonial-${i}`, _type: "testimonial", order: i, ...t })),
];

// Remove empty values so the Studio does not show blank strings as filled.
const clean = (o) => JSON.parse(JSON.stringify(o, (_, v) => (v === "" ? undefined : v)));

writeFileSync("seed.ndjson", docs.map((d) => JSON.stringify(clean(d))).join("\n") + "\n");
console.log(`seed.ndjson gerado com ${docs.length} documentos.`);
