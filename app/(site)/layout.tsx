import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getSettings } from "@/lib/content";

/** Re-render hourly so packages whose dates have passed drop off even without new edits. */
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat phone={settings.whatsapp} />
      <Analytics />
    </>
  );
}
