export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

/** Without a project ID the site falls back to data/seed.json. */
export const sanityEnabled = Boolean(projectId);
