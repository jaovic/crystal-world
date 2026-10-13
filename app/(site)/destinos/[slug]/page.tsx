import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Sparkle } from "@/components/Icons";
import { PackageCard } from "@/components/PackageCard";
import { QuoteForm } from "@/components/QuoteForm";
import { WaButton } from "@/components/WaButton";
import { getDestination, getDestinations, getPackages, getSettings } from "@/lib/content";
import { img } from "@/lib/format";
import { messages, waLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getDestinations()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getDestination((await params).slug);
  if (!d) return {};
  return {
    title: `${d.name}: dicas, melhor época e pacotes`,
    description: d.subtitle,
    openGraph: { images: [img(d.image, 1200)] },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const [d, packages, settings] = await Promise.all([getDestination(slug), getPackages(), getSettings()]);
  if (!d) notFound();
  const related = packages.filter((p) => p.destinationSlug === d.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image src={img(d.image, 2000)} alt={d.name} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-navy-950/10" />
        <div className="container-site flex min-h-[420px] flex-col justify-end pt-24 pb-12 text-white md:min-h-[520px]">
          <Link href="/destinos" className="text-sm text-white/75 hover:text-white">← Destinos</Link>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{d.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">{d.subtitle}</p>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-12">
          {d.why && (
            <div>
              <h2 className="font-display text-3xl text-navy-900">Por que conhecer {d.name}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink">{d.why}</p>
            </div>
          )}

          {d.highlights.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-navy-900">O que conhecer</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {d.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 rounded-xl border border-line p-4"><Check className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />{h}</li>
                ))}
              </ul>
            </div>
          )}

          {d.bestTime && (
            <div className="rounded-2xl bg-sky-50 p-6 md:p-8">
              <h2 className="font-display text-2xl text-navy-900">Melhor época para viajar</h2>
              <p className="mt-3 text-ink">{d.bestTime}</p>
            </div>
          )}

          {d.experiences.length > 0 && (
            <div>
              <p className="eyebrow">Vivido pela Renata</p>
              <h2 className="mt-2 font-display text-3xl text-navy-900">Experiências que indicamos</h2>
              <div className="mt-6 space-y-6">
                {d.experiences.map((e) => (
                  <article key={e.title} className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-[1fr_1.2fr]">
                    {e.image && (
                      <div className="relative aspect-[4/3] md:aspect-auto">
                        <Image src={img(e.image, 800)} alt={e.title} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <Sparkle className="h-6 w-6 text-gold-500" />
                      <h3 className="mt-3 text-xl font-semibold text-navy-900">{e.title}</h3>
                      <p className="mt-2 text-muted">{e.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-navy-900 p-6 text-white">
            <p className="font-display text-2xl">Quer conhecer {d.name}?</p>
            <p className="mt-2 text-sm text-white/75">A Renata monta uma cotação de acordo com as suas datas e o seu perfil de viagem.</p>
            <WaButton href={waLink(settings.whatsapp, messages.destination(d))} source={`destino:${d.slug}`} className="btn btn-gold mt-5 w-full">
              Cotar viagem para {d.name}
            </WaButton>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-site border-t border-line py-16">
          <h2 className="font-display text-3xl text-navy-900">Pacotes para {d.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        </section>
      )}

      <section id="cotacao" className="bg-sky-50">
        <div className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">Cotação personalizada</p>
            <h2 className="mt-2 font-display text-3xl text-navy-900 md:text-4xl">Cotar viagem para {d.name}</h2>
            <p className="mt-3 text-muted">Preencha os dados e a conversa continua com a Renata pelo WhatsApp.</p>
          </div>
          <QuoteForm phone={settings.whatsapp} defaultDestination={d.name} />
        </div>
      </section>
    </>
  );
}
