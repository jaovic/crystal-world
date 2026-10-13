import type { Metadata } from "next";
import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { PageHero } from "@/components/Section";
import { getDestinations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinos",
  description: "Destinos nacionais e internacionais trabalhados pela Crystal World Turismo: dicas, melhor época e pacotes relacionados.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  const groups = [
    { id: "nacionais", title: "Destinos nacionais", items: destinations.filter((d) => d.scope === "nacional") },
    { id: "internacionais", title: "Destinos internacionais", items: destinations.filter((d) => d.scope === "internacional") },
  ];

  return (
    <>
      <PageHero eyebrow="Destinos" title="Encontre seu próximo destino" text="Inspiração, dicas e informações para escolher a viagem certa para o seu momento.">
        <div className="mt-6 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-800 hover:border-navy-800">
              {g.title}
            </a>
          ))}
        </div>
      </PageHero>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="container-site scroll-mt-24 py-14">
          <h2 className="font-display text-3xl text-navy-900">{g.title}</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {g.items.map((d) => <DestinationCard key={d.slug} destination={d} />)}
          </div>
        </section>
      ))}

      <section className="container-site pb-20">
        <div className="rounded-2xl bg-sky-50 p-8 text-center md:p-12">
          <p className="font-display text-2xl text-navy-900 md:text-3xl">Não encontrou o destino que procura?</p>
          <p className="mt-2 text-muted">A Crystal World trabalha com muitos outros destinos. Conte o que você imagina.</p>
          <Link href="/viagem-personalizada" className="btn btn-primary mt-6">Planejar minhas férias</Link>
        </div>
      </section>
    </>
  );
}
