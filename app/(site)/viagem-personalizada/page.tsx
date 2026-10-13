import type { Metadata } from "next";
import { CustomTripForm } from "@/components/CustomTripForm";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Viagem personalizada",
  description: "Não encontrou o pacote ideal? Conte para onde, quando e com quem você quer viajar e a Renata pesquisa para você.",
};

export default async function CustomTripPage() {
  const settings = await getSettings();
  return (
    <section className="bg-sky-50">
      <div className="container-site grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <p className="eyebrow">Viagem personalizada</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-navy-900 md:text-5xl">
            A viagem que você procura não está nos nossos pacotes?
          </h1>
          <p className="mt-4 text-lg text-muted">Nós podemos pesquisar para você.</p>
          <ol className="mt-8 space-y-4 text-ink">
            {[
              "Você conta o que imagina em três passos rápidos.",
              "A Renata pesquisa as melhores opções para o seu período e perfil.",
              "A cotação chega pelo WhatsApp, e vocês ajustam juntos até fechar.",
            ].map((text, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">{i + 1}</span>
                <span className="pt-1">{text}</span>
              </li>
            ))}
          </ol>
        </div>
        <CustomTripForm phone={settings.whatsapp} />
      </div>
    </section>
  );
}
