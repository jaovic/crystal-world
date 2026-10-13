import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/format";
import type { SiteSettings, Testimonial } from "@/lib/types";
import { messages, waLink } from "@/lib/whatsapp";
import { Sparkle, Star } from "./Icons";
import { SectionHeading } from "./Section";
import { WaButton } from "./WaButton";

const TRIP_TYPES = [
  { label: "Praia", href: "/pacotes?categoria=praia", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { label: "Internacional", href: "/pacotes?tipo=internacional", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
  { label: "Férias em família", href: "/pacotes?categoria=familia", image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec" },
  { label: "Resorts", href: "/pacotes?categoria=resorts", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" },
  { label: "Viagens a dois", href: "/pacotes?categoria=a-dois", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077" },
  { label: "Feriados", href: "/pacotes?categoria=feriados", image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543" },
];

export function TripTypes() {
  return (
    <section className="container-site py-20">
      <SectionHeading eyebrow="Tipos de viagem" title="Encontre sua próxima viagem" text="Escolha pelo estilo de viagem e veja as oportunidades que combinam com você." />
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {TRIP_TYPES.map((t) => (
          <Link key={t.label} href={t.href} className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image src={img(t.image, 700)} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-navy-950/40 transition-colors group-hover:bg-navy-950/55" />
            <span className="absolute inset-0 flex items-center justify-center px-2 text-center font-display text-xl text-white md:text-3xl">{t.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/destinos" className="btn btn-primary">Explorar destinos</Link>
      </div>
    </section>
  );
}

const REASONS = [
  { title: "Atendimento com a Renata", text: "Você conversa direto com quem planeja e fecha a sua viagem, do primeiro contato ao embarque." },
  { title: "Mais de 10 anos de agência", text: "A Crystal World nasceu em 2015 e já ajudou muitas famílias e casais a viajarem com tranquilidade." },
  { title: "Viagens sob medida", text: "Pacotes prontos quando fazem sentido, e roteiros montados do zero quando você quer algo diferente." },
  { title: "Acompanhamento em cada etapa", text: "Cotação, reserva, documentação e suporte durante a viagem, sem você ficar sozinho com dúvidas." },
];

export function WhyCrystal() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-site grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading light eyebrow="Por que viajar com a Crystal" title="Uma viagem bem planejada começa com uma boa conversa" />
          <p className="mt-5 text-white/75">
            Experiência de quem morou fora do Brasil, trabalhou na aviação e no mercado de turismo, colocada a serviço da sua próxima viagem.
          </p>
          <Link href="/sobre" className="btn btn-outline mt-8 text-white">Conheça a Renata</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Sparkle className="h-6 w-6 text-gold-500" />
              <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-white/70">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      {t.image && (
        <div className="relative aspect-[16/10]">
          <Image src={img(t.image, 600)} alt={`Viagem de ${t.name} para ${t.destination}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex gap-0.5 text-gold-500">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
        </div>
        <blockquote className="mt-4 flex-1 text-ink">“{t.text}”</blockquote>
        <figcaption className="mt-5 text-sm">
          <span className="font-semibold text-navy-900">{t.name}</span>
          {t.destination && <span className="text-muted"> · viajou para {t.destination}</span>}
        </figcaption>
      </div>
    </figure>
  );
}

export function VipSection({ settings }: { settings: SiteSettings }) {
  const href = settings.vipGroupUrl || waLink(settings.whatsapp, messages.vip());
  return (
    <section className="container-site py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 px-6 py-14 text-center text-white md:px-16">
        <p className="eyebrow !text-gold-500">Grupo VIP Crystal World</p>
        <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl md:text-4xl">Quer receber nossas oportunidades primeiro?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Entre para o Grupo VIP e acompanhe pacotes selecionados, novidades e condições especiais pelo WhatsApp.
        </p>
        <WaButton href={href} source="grupo-vip" event="vip" className="btn btn-gold mt-8">
          Entrar para o Grupo VIP
        </WaButton>
      </div>
    </section>
  );
}

export function FinalCta({ title = "Quer ser o próximo a fazer as malas?", settings }: { title?: string; settings: SiteSettings }) {
  return (
    <section className="bg-sky-50">
      <div className="container-site flex flex-col items-center gap-6 py-16 text-center">
        <h2 className="max-w-2xl font-display text-3xl text-navy-900 md:text-4xl">{title}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/viagem-personalizada" className="btn btn-primary">Planejar minha viagem</Link>
          <WaButton href={waLink(settings.whatsapp, messages.general())} source="cta-final">Falar com a Renata</WaButton>
        </div>
      </div>
    </section>
  );
}
