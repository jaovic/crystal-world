import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { Calendar, Check, MapPin, Moon, Plane } from "@/components/Icons";
import { PackageCard } from "@/components/PackageCard";
import { WaButton } from "@/components/WaButton";
import { getPackage, getPackages, getSettings } from "@/lib/content";
import { CATEGORY_LABELS, formatPeriod, formatPrice, img, SCOPE_LABELS } from "@/lib/format";
import { messages, waLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPackages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await getPackage((await params).slug);
  if (!pkg) return {};
  const period = formatPeriod(pkg.startDate, pkg.endDate);
  return {
    title: `${pkg.title} · ${period}`,
    description: pkg.summary ?? `Pacote para ${pkg.title} de ${period}, ${pkg.nights} noites.`,
    openGraph: { images: pkg.images[0] ? [img(pkg.images[0], 1200)] : [] },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const [pkg, settings, all] = await Promise.all([getPackage(slug), getSettings(), getPackages()]);
  if (!pkg) notFound();

  const href = waLink(settings.whatsapp, messages.package(pkg));
  const related = all.filter((p) => p.slug !== pkg.slug && p.scope === pkg.scope).slice(0, 3);

  return (
    <>
      <div className="container-site pt-8 text-sm text-muted">
        <Link href="/pacotes" className="hover:text-navy-800">Pacotes</Link> <span aria-hidden>/</span> {pkg.title}
      </div>

      <section className="container-site grid gap-10 py-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-navy-800">{SCOPE_LABELS[pkg.scope]}</span>
            {pkg.categories.map((c) => (
              <span key={c} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-muted">{CATEGORY_LABELS[c]}</span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight text-navy-900 md:text-5xl">{pkg.title}</h1>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <span className="inline-flex items-center gap-2"><Calendar className="h-5 w-5" />{formatPeriod(pkg.startDate, pkg.endDate)}</span>
            <span className="inline-flex items-center gap-2"><Moon className="h-5 w-5" />{pkg.nights} noites</span>
            <span className="inline-flex items-center gap-2"><Plane className="h-5 w-5" />Saída de {pkg.departureCity}</span>
          </div>

          <div className="mt-8">
            <Gallery images={pkg.images} alt={pkg.title} />
          </div>

          {pkg.summary && <p className="mt-8 text-lg text-ink">{pkg.summary}</p>}

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-navy-900">O que está incluso</h2>
              <ul className="mt-4 space-y-2.5">
                {pkg.included.map((item) => (
                  <li key={item} className="flex gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />{item}</li>
                ))}
              </ul>
            </div>
            {pkg.hotel && (
              <div>
                <h2 className="font-display text-2xl text-navy-900">Hospedagem</h2>
                <p className="mt-4 inline-flex items-start gap-2 font-semibold text-ink"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />{pkg.hotel}</p>
                {pkg.hotelDescription && <p className="mt-2 text-muted">{pkg.hotelDescription}</p>}
              </div>
            )}
          </div>

          {pkg.importantInfo.length > 0 && (
            <div className="mt-10 rounded-2xl bg-sky-50 p-6">
              <h2 className="font-display text-2xl text-navy-900">Informações importantes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-ink">
                {pkg.importantInfo.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Investimento + CTA */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-lg shadow-navy-900/5">
            <p className="eyebrow">Investimento</p>
            {pkg.priceFrom ? (
              <>
                <p className="mt-3 text-sm text-muted">a partir de</p>
                <p className="text-4xl font-bold text-navy-800">{formatPrice(pkg.priceFrom)}</p>
                {pkg.priceNote && <p className="mt-1 text-sm text-muted">{pkg.priceNote}</p>}
              </>
            ) : (
              <p className="mt-3 text-2xl font-bold text-navy-800">Valor sob consulta</p>
            )}
            {pkg.paymentConditions && <p className="mt-4 border-t border-line pt-4 text-sm text-ink">{pkg.paymentConditions}</p>}

            <div className="mt-6 border-t border-line pt-6">
              <p className="font-display text-xl leading-snug text-navy-900">Gostou desse pacote?</p>
              <p className="mt-2 text-sm text-muted">
                Fale com a Renata para consultar a disponibilidade atual e seguir com sua reserva.
              </p>
              <WaButton href={href} source={`pacote:${pkg.slug}`} className="btn btn-whatsapp mt-5 w-full">
                Quero consultar este pacote
              </WaButton>
            </div>
            <p className="mt-4 text-xs text-muted">Valores sujeitos a alteração e disponibilidade no momento da reserva.</p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-site border-t border-line py-16">
          <h2 className="font-display text-3xl text-navy-900">Outras oportunidades</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
