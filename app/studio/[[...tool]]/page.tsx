import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityEnabled } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <main style={{ fontFamily: "system-ui", maxWidth: 560, margin: "15vh auto", padding: 16, lineHeight: 1.5 }}>
        <h1>Painel ainda não configurado</h1>
        <p>
          Defina <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> no arquivo <code>.env.local</code> (ou nas variáveis da Vercel) para
          ativar o painel de edição. Veja o passo a passo no README do projeto.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
