import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Sanity webhook: refreshes site content right after the admin publishes a change.
 * Configure in sanity.io/manage → API → Webhooks with URL /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>.
 */
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag("sanity");
  return NextResponse.json({ ok: true, revalidated: true });
}
