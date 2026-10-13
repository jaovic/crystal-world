"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { submitLead } from "@/lib/submitLead";
import { ArrowRight } from "./Icons";
import { LeadSuccess } from "./LeadSuccess";

const STEPS = ["Destino e data", "Quem vai", "Preferências e contato"];

/** Guided form for "Viagem personalizada": three short steps instead of one long form. */
export function CustomTripForm({ phone }: { phone: string }) {
  const [step, setStep] = useState(0);
  const [sentHref, setSentHref] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function stepIsValid() {
    const fieldset = formRef.current?.querySelector<HTMLFieldSetElement>(`fieldset[data-step="${step}"]`);
    const invalid = fieldset && Array.from(fieldset.querySelectorAll<HTMLInputElement>("input, textarea")).find((el) => !el.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return false;
    }
    return true;
  }

  function next() {
    if (stepIsValid()) setStep((s) => s + 1);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepIsValid()) return;
    if (step < STEPS.length - 1) return setStep((s) => s + 1);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const adults = v("adults");
    const children = v("children");
    const ages = v("childrenAges");
    const travelers = [
      `${adults} adulto${adults === "1" ? "" : "s"}`,
      children && children !== "0" && `${children} criança${children === "1" ? "" : "s"}${ages ? ` (${ages})` : ""}`,
      v("occasion"),
    ]
      .filter(Boolean)
      .join(", ");
    const href = submitLead(
      phone,
      {
        kind: "personalizada",
        name: v("name"),
        whatsapp: v("whatsapp"),
        destination: v("destination"),
        period: v("period"),
        travelers,
        departureCity: v("departureCity"),
        preferences: v("preferences"),
      },
      v("company"),
    );
    setSentHref(href);
  }

  if (sentHref) return <LeadSuccess href={sentHref} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-10">
      <ol className="mb-8 flex gap-2" aria-label="Etapas">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-navy-800" : "bg-line"}`} />
            <p className={`mt-2 hidden text-xs font-semibold sm:block ${i === step ? "text-navy-800" : "text-muted"}`}>
              {i + 1}. {label}
            </p>
          </li>
        ))}
      </ol>

      <fieldset data-step="0" className={step === 0 ? "space-y-5" : "hidden"}>
        <div>
          <label className="label !text-lg" htmlFor="c-dest">Para onde você quer ir?</label>
          <input id="c-dest" name="destination" required placeholder="Um destino, uma região ou só uma ideia: 'praia com crianças'" className="field" />
        </div>
        <div>
          <label className="label !text-lg" htmlFor="c-period">Quando pretende viajar?</label>
          <input id="c-period" name="period" required placeholder="Datas, mês ou período (ex.: Réveillon, férias de julho)" className="field" />
        </div>
      </fieldset>

      <fieldset data-step="1" className={step === 1 ? "space-y-5" : "hidden"}>
        <p className="label !text-lg">Quem vai viajar?</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label" htmlFor="c-adults">Adultos</label>
            <input id="c-adults" name="adults" type="number" min={1} defaultValue={2} required className="field" />
          </div>
          <div>
            <label className="label" htmlFor="c-children">Crianças</label>
            <input id="c-children" name="children" type="number" min={0} defaultValue={0} className="field" />
          </div>
          <div>
            <label className="label" htmlFor="c-ages">Idade das crianças</label>
            <input id="c-ages" name="childrenAges" placeholder="Ex.: 3 e 8" className="field" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="c-occasion">É uma ocasião especial?</label>
          <input id="c-occasion" name="occasion" placeholder="Lua de mel, aniversário, formatura..." className="field" />
        </div>
        <div>
          <label className="label !text-lg" htmlFor="c-from">De onde vocês vão sair?</label>
          <input id="c-from" name="departureCity" required placeholder="Ex.: Belo Horizonte" className="field" />
        </div>
      </fieldset>

      <fieldset data-step="2" className={step === 2 ? "space-y-5" : "hidden"}>
        <div>
          <label className="label !text-lg" htmlFor="c-pref">Existe alguma preferência de hotel, resort, localização ou experiência?</label>
          <textarea id="c-pref" name="preferences" rows={4} placeholder="Ex.: resort all inclusive, hotel pé na areia, passeios de barco, orçamento aproximado..." className="field" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="c-name">Seu nome *</label>
            <input id="c-name" name="name" required autoComplete="name" className="field" />
          </div>
          <div>
            <label className="label" htmlFor="c-wa">WhatsApp *</label>
            <input id="c-wa" name="whatsapp" type="tel" inputMode="tel" required autoComplete="tel" placeholder="(31) 9 0000-0000" className="field" />
          </div>
        </div>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm font-semibold text-muted hover:text-navy-800">
            ← Voltar
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-primary">
            Continuar <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" className="btn btn-gold">Enviar minha solicitação</button>
        )}
      </div>
      {step === STEPS.length - 1 && (
        <p className="mt-4 text-xs text-muted">
          Ao enviar, você concorda em ser contatado pela Crystal World pelo WhatsApp. Veja a{" "}
          <Link href="/privacidade" className="underline">Política de Privacidade</Link>.
        </p>
      )}
    </form>
  );
}
