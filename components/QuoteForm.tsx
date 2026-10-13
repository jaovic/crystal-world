"use client";

import Link from "next/link";
import { useState } from "react";
import { submitLead } from "@/lib/submitLead";
import { LeadSuccess } from "./LeadSuccess";

export function QuoteForm({ phone, defaultDestination = "" }: { phone: string; defaultDestination?: string }) {
  const [sentHref, setSentHref] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const href = submitLead(
      phone,
      {
        kind: "cotacao",
        name: v("name"),
        whatsapp: v("whatsapp"),
        destination: v("destination"),
        departureCity: v("departureCity"),
        period: v("period"),
        adults: v("adults"),
        children: v("children"),
        childrenAges: v("childrenAges"),
        notes: v("notes"),
      },
      v("company"),
    );
    setSentHref(href);
  }

  if (sentHref) return <LeadSuccess href={sentHref} />;

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="q-name">Nome *</label>
          <input id="q-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="q-wa">WhatsApp *</label>
          <input id="q-wa" name="whatsapp" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(31) 9 0000-0000" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="q-dest">Destino desejado *</label>
          <input id="q-dest" name="destination" required defaultValue={defaultDestination} placeholder="Ex.: Maceió, Itália, ainda não sei..." className="field" />
        </div>
        <div>
          <label className="label" htmlFor="q-from">Cidade de saída</label>
          <input id="q-from" name="departureCity" placeholder="Ex.: Belo Horizonte" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="q-period">Data ou período *</label>
          <input id="q-period" name="period" required placeholder="Ex.: 10 a 17 de janeiro, ou férias de julho" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="q-adults">Adultos</label>
          <input id="q-adults" name="adults" type="number" min={1} defaultValue={2} className="field" />
        </div>
        <div className="grid grid-cols-[90px_1fr] gap-3">
          <div>
            <label className="label" htmlFor="q-children">Crianças</label>
            <input id="q-children" name="children" type="number" min={0} defaultValue={0} className="field" />
          </div>
          <div>
            <label className="label" htmlFor="q-ages">Idades</label>
            <input id="q-ages" name="childrenAges" placeholder="Ex.: 4 e 9" className="field" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="q-notes">Observações</label>
          <textarea id="q-notes" name="notes" rows={3} placeholder="Tipo de hotel, orçamento, ocasião especial..." className="field" />
        </div>
        {/* honeypot anti-spam */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">Solicitar minha cotação</button>
      <p className="mt-3 text-xs text-muted">
        Ao enviar, você concorda em ser contatado pela Crystal World pelo WhatsApp. Veja a{" "}
        <Link href="/privacidade" className="underline">Política de Privacidade</Link>.
      </p>
    </form>
  );
}
