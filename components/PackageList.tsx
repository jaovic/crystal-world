"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_LABELS, MONTHS, monthOf, SCOPE_LABELS } from "@/lib/format";
import type { Category, Scope, TravelPackage } from "@/lib/types";
import { PackageCard } from "./PackageCard";

type Option = { value: string; label: string };

export function PackageList({ packages }: { packages: TravelPackage[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tipo = params.get("tipo") ?? "";
  const categoria = params.get("categoria") ?? "";
  const mes = params.get("mes") ?? "";
  const destino = params.get("destino") ?? "";
  const saida = params.get("saida") ?? "";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = packages.filter(
    (p) =>
      (!tipo || p.scope === tipo) &&
      (!categoria || p.categories.includes(categoria as Category)) &&
      (!mes || monthOf(p.startDate) === Number(mes)) &&
      (!destino || p.title === destino) &&
      (!saida || p.departureCity === saida),
  );

  const uniq = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const monthOptions: Option[] = Array.from(new Set(packages.map((p) => monthOf(p.startDate))))
    .sort((a, b) => a - b)
    .map((m) => ({ value: String(m), label: MONTHS[m - 1] }));
  const destinationOptions: Option[] = uniq(packages.map((p) => p.title)).map((v) => ({ value: v, label: v }));
  const departureOptions: Option[] = uniq(packages.map((p) => p.departureCity)).map((v) => ({ value: v, label: v }));
  const hasFilters = Boolean(tipo || categoria || mes || destino || saida);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        <Chip active={!tipo && !categoria} onClick={() => router.replace(pathname, { scroll: false })}>Todos</Chip>
        {(Object.keys(SCOPE_LABELS) as Scope[]).map((s) => (
          <Chip key={s} active={tipo === s} onClick={() => setParam("tipo", tipo === s ? "" : s)}>{SCOPE_LABELS[s]}</Chip>
        ))}
        <span className="mx-1 hidden w-px bg-line sm:block" />
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
          <Chip key={c} active={categoria === c} onClick={() => setParam("categoria", categoria === c ? "" : c)}>{CATEGORY_LABELS[c]}</Chip>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Select label="Mês da viagem" value={mes} options={monthOptions} onChange={(v) => setParam("mes", v)} />
        <Select label="Destino" value={destino} options={destinationOptions} onChange={(v) => setParam("destino", v)} />
        <Select label="Cidade de saída" value={saida} options={departureOptions} onChange={(v) => setParam("saida", v)} />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <p>{filtered.length} {filtered.length === 1 ? "pacote encontrado" : "pacotes encontrados"}</p>
        {hasFilters && (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="font-semibold text-navy-800 underline">
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <PackageCard key={p.slug} pkg={p} cta="Ver detalhes" />)}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="font-display text-2xl text-navy-900">Nenhum pacote com esses filtros agora</p>
          <p className="mt-2 text-muted">A Renata pode pesquisar uma opção sob medida para você.</p>
          <Link href="/viagem-personalizada" className="btn btn-primary mt-6">Planejar minhas férias</Link>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "border-navy-800 bg-navy-800 text-white" : "border-line bg-white text-ink hover:border-navy-800"
      }`}
    >
      {children}
    </button>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: Option[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field">
        <option value="">{label}: todos</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
