import Image from "next/image";
import Link from "next/link";
import { formatPeriod, formatPrice, img, SCOPE_LABELS } from "@/lib/format";
import type { TravelPackage } from "@/lib/types";
import { ArrowRight, Calendar, Check, Moon } from "./Icons";

export function PackageCard({ pkg, cta = "Ver pacote" }: { pkg: TravelPackage; cta?: string }) {
  return (
    <Link
      href={`/pacotes/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-xl hover:shadow-navy-900/8"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img(pkg.images[0], 800)}
          alt={pkg.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-800">
          {SCOPE_LABELS[pkg.scope]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-navy-900">{pkg.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatPeriod(pkg.startDate, pkg.endDate)}</span>
          <span className="inline-flex items-center gap-1.5"><Moon className="h-4 w-4" />{pkg.nights} noites</span>
        </div>

        <ul className="mt-4 space-y-1.5 text-sm text-ink">
          {pkg.included.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {pkg.priceFrom ? (
              <>
                <p className="text-xs text-muted">a partir de</p>
                <p className="text-xl font-bold text-navy-800">{formatPrice(pkg.priceFrom)}</p>
              </>
            ) : (
              <p className="text-sm font-semibold text-navy-800">Valor sob consulta</p>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-gold-600 uppercase">
            {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
