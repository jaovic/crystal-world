import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Política de Privacidade", robots: { index: false } };

// Texto provisório (Fase 2 do escopo): revisar com apoio jurídico antes de publicar a versão final.
export default async function PrivacyPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero title="Política de Privacidade" />
      <section className="container-site prose-site max-w-3xl py-14 text-ink">
        <p>
          A Crystal World Turismo coleta apenas os dados que você informa nos formulários do site (nome, WhatsApp e detalhes da
          viagem desejada) com a finalidade de preparar cotações e dar continuidade ao seu atendimento.
        </p>
        <p>
          Esses dados são armazenados com acesso restrito à equipe da agência e não são vendidos nem compartilhados com terceiros,
          exceto fornecedores necessários para a cotação ou reserva da sua viagem.
        </p>
        <p>
          O site pode utilizar ferramentas de medição de audiência (Google Analytics e Meta Pixel) para entender como os visitantes
          chegam até nós e melhorar a comunicação.
        </p>
        <p>
          Você pode solicitar a consulta, correção ou exclusão dos seus dados a qualquer momento
          {s.email ? <> pelo e-mail <a className="underline" href={`mailto:${s.email}`}>{s.email}</a></> : " pelos nossos canais de contato"}.
        </p>
      </section>
    </>
  );
}
