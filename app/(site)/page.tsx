import Image from "next/image";
import Link from "next/link";
import { FinalCta, TestimonialCard, TripTypes, VipSection, WhyCrystal } from "@/components/HomeSections";
import { ArrowRight } from "@/components/Icons";
import { PackageCard } from "@/components/PackageCard";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionHeading } from "@/components/Section";
import { getFeaturedPackages, getSettings, getTestimonials } from "@/lib/content";
import { img } from "@/lib/format";

export default async function HomePage() {
  const [packages, testimonials, settings] = await Promise.all([getFeaturedPackages(), getTestimonials(), getSettings()]);

  return (
    <>
      {/* 1. Banner principal */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={img("https://images.unsplash.com/photo-1507525428034-b723cf961d3e", 2000)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/55 to-navy-950/10" />
        <div className="container-site flex min-h-[78vh] flex-col justify-center py-24 text-white md:min-h-[640px]">
          <p className="eyebrow !text-gold-500">Crystal World Turismo · desde 2015</p>
          <h1 className="mt-4 max-w-2xl font-display text-[2.6rem] leading-[1.08] md:text-7xl">Seu próximo destino começa aqui.</h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Pacotes nacionais e internacionais, experiências e viagens personalizadas com acompanhamento em cada etapa.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/pacotes" className="btn btn-gold">Ver pacotes</Link>
            <Link href="#cotacao" className="btn btn-outline text-white">Solicitar cotação</Link>
          </div>
        </div>
      </section>

      {/* 2. Pacotes em destaque */}
      {packages.length > 0 && (
        <section className="container-site py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Pacotes em destaque" title="Para onde vamos agora?" text="Uma seleção de oportunidades com datas definidas." />
            <Link href="/pacotes" className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-navy-800 uppercase hover:text-gold-600">
              Ver todos os pacotes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
          <p className="mt-6 text-xs text-muted">Valores sujeitos a alteração e disponibilidade no momento da reserva.</p>
        </section>
      )}

      {/* 3. Tipos de viagem */}
      <div className="bg-sky-50/60">
        <TripTypes />
      </div>

      {/* 4. Cotação personalizada */}
      <section id="cotacao" className="container-site scroll-mt-24 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Cotação personalizada"
              title="Não encontrou exatamente a viagem que procura?"
              text="Conte para a gente onde e quando você quer viajar. A Renata prepara uma cotação de acordo com o seu período e perfil de viagem."
            />
            <p className="mt-6 text-sm text-muted">
              Prefere contar com calma?{" "}
              <Link href="/viagem-personalizada" className="font-semibold text-navy-800 underline">Monte sua viagem personalizada</Link>.
            </p>
          </div>
          <QuoteForm phone={settings.whatsapp} />
        </div>
      </section>

      {/* 5. Por que viajar com a Crystal */}
      <WhyCrystal />

      {/* 6. Depoimentos */}
      {testimonials.length > 0 && (
        <section className="container-site py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Depoimentos" title="Quem viajou com a gente conta" />
            <Link href="/depoimentos" className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-navy-800 uppercase hover:text-gold-600">
              Ver depoimentos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </section>
      )}

      {/* 7. Grupo VIP */}
      <VipSection settings={settings} />

      {/* 8. CTA */}
      <FinalCta settings={settings} />
    </>
  );
}
