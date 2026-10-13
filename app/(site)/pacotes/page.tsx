import type { Metadata } from "next";
import { Suspense } from "react";
import { PackageCard } from "@/components/PackageCard";
import { PackageList } from "@/components/PackageList";
import { PageHero } from "@/components/Section";
import { getPackages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pacotes de viagem",
  description: "Pacotes nacionais e internacionais com datas definidas: praia, família, feriados, resorts e viagens a dois.",
};

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <>
      <PageHero eyebrow="Pacotes" title="Pacotes de viagem" text="Encontre uma oportunidade para sua próxima viagem." />
      <section className="container-site py-12">
        {/* Fallback keeps the full list in the server HTML (SEO) until the filters hydrate */}
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => <PackageCard key={p.slug} pkg={p} cta="Ver detalhes" />)}
            </div>
          }
        >
          <PackageList packages={packages} />
        </Suspense>
        <p className="mt-10 text-xs text-muted">Valores sujeitos a alteração e disponibilidade no momento da reserva.</p>
      </section>
    </>
  );
}
