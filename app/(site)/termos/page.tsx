import type { Metadata } from "next";
import { PageHero } from "@/components/Section";

export const metadata: Metadata = { title: "Termos de Uso", robots: { index: false } };

// Texto provisório (Fase 2 do escopo): revisar com apoio jurídico antes de publicar a versão final.
export default function TermsPage() {
  return (
    <>
      <PageHero title="Termos de Uso" />
      <section className="container-site prose-site max-w-3xl py-14 text-ink">
        <p>
          As informações de pacotes, valores e condições apresentadas neste site têm caráter informativo e estão sujeitas a
          alteração e à disponibilidade no momento da reserva.
        </p>
        <p>
          O envio de formulários ou o contato pelo WhatsApp não garante reserva. Toda reserva é confirmada somente após a cotação
          final, o aceite das condições e a confirmação do pagamento junto à Crystal World Turismo.
        </p>
        <p>As imagens utilizadas são ilustrativas e podem não corresponder exatamente aos serviços contratados.</p>
      </section>
    </>
  );
}
