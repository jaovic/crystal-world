import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/HomeSections";
import { PageHero } from "@/components/Section";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre a Crystal World",
  description: "Conheça a Renata e a trajetória por trás da Crystal World Turismo, agência criada em 2015 em Belo Horizonte.",
};

const TIMELINE = [
  { when: "16 a 22 anos", text: "Experiência com atendimento e vendas." },
  { when: "23 a 33 anos", text: "10 anos morando fora do Brasil, incluindo experiência profissional em Barcelona." },
  { when: "De volta ao Brasil", text: "Formação como comissária de bordo pela ESAER e em Turismo pela Newton Paiva." },
  { when: "Mercado de turismo", text: "Experiência em agência corporativa e em agência de lazer." },
  { when: "2015", text: "Nascimento da Crystal World Turismo." },
  { when: "Hoje", text: "Mais de 10 anos ajudando clientes a planejarem suas viagens." },
];

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Sobre nós"
        title="Por trás da Crystal World"
        text="A experiência que existe antes de cada viagem planejada."
      />

      <section className="container-site grid gap-14 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          {/* Substituir por uma foto real da Renata em public/img/renata.jpg */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950">
            <Image src="/img/crystal-logo.png" alt="" width={200} height={100} className="absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 opacity-30 brightness-0 invert" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-800">Foto da Renata</span>
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl text-navy-900">Uma trajetória feita de viagens e atendimento</h2>
          <ol className="relative mt-8 border-l-2 border-sky-100 pl-8">
            {TIMELINE.map((item) => (
              <li key={item.when} className="relative pb-8 last:pb-0">
                <span className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-white bg-gold-500 ring-2 ring-sky-100" />
                <p className="text-sm font-bold tracking-wide text-gold-600 uppercase">{item.when}</p>
                <p className="mt-1 text-lg text-ink">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="container-site max-w-3xl py-20 text-center">
          <p className="eyebrow !text-gold-500">Fechamento pessoal</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Muito prazer, sou a Renata.</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Além de estar à frente da Crystal World, sou mãe de dois filhos, casada e construí minha trajetória profissional passando
            por diferentes experiências, países e áreas de atendimento. Hoje, uso toda essa experiência para acompanhar nossos
            clientes desde os primeiros planos até o momento de fazer as malas.
          </p>
        </div>
      </section>

      <FinalCta title="Vamos planejar sua próxima viagem juntos?" settings={settings} />
    </>
  );
}
