import type { Metadata } from "next";
import { Clock, InstagramIcon, Mail, MapPin, WhatsAppIcon } from "@/components/Icons";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/Section";
import { WaButton } from "@/components/WaButton";
import { getSettings } from "@/lib/content";
import { formatPhone } from "@/lib/format";
import { messages, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Renata para cotações e reservas de viagens nacionais e internacionais.",
};

export default async function ContactPage() {
  const s = await getSettings();
  const instagramHandle = s.instagram?.replace(/\/$/, "").split("/").pop();

  const items = [
    { icon: <WhatsAppIcon className="h-5 w-5" />, label: "WhatsApp", value: formatPhone(s.whatsapp), href: waLink(s.whatsapp, messages.general()) },
    s.instagram && { icon: <InstagramIcon className="h-5 w-5" />, label: "Instagram", value: `@${instagramHandle}`, href: s.instagram },
    s.email && { icon: <Mail className="h-5 w-5" />, label: "E-mail", value: s.email, href: `mailto:${s.email}` },
    s.address && { icon: <MapPin className="h-5 w-5" />, label: "Endereço", value: s.address },
    s.hours && { icon: <Clock className="h-5 w-5" />, label: "Horário de atendimento", value: s.hours },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero eyebrow="Contato" title="Vamos planejar sua próxima viagem?" text="Cotações e reservas são feitas diretamente com a Renata." />

      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <ul className="space-y-5">
            {items.map((item) => (
              <li key={item.label} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-navy-800">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted uppercase">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-lg font-semibold text-navy-900 hover:text-gold-600">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg text-navy-900">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <WaButton href={waLink(s.whatsapp, messages.general())} source="contato" className="btn btn-whatsapp mt-8">
            Falar com a Renata
          </WaButton>
        </div>

        <div id="cotacao" className="scroll-mt-24">
          <h2 className="font-display text-3xl text-navy-900">Solicite uma cotação</h2>
          <p className="mt-2 mb-6 text-muted">Preencha os dados e a conversa continua pelo WhatsApp.</p>
          <QuoteForm phone={s.whatsapp} />
        </div>
      </section>
    </>
  );
}
