import Image from "next/image";
import Link from "next/link";
import { formatPhone } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";
import { messages, waLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

export function Footer({ settings }: { settings: SiteSettings }) {
  const vip = settings.vipGroupUrl || waLink(settings.whatsapp, messages.vip());
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-lg bg-white px-3 py-2">
            <Image src="/img/crystal-logo.png" alt="Crystal World Turismo" width={120} height={60} className="h-11 w-auto" />
          </div>
          <p className="mt-5 font-display text-xl text-white">Crystal World Turismo</p>
          <p className="mt-1 text-sm">Pacotes nacionais e internacionais | Viagens personalizadas</p>
          <div className="mt-5 flex gap-3">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/20 p-2.5 hover:bg-white/10">
                <InstagramIcon className="h-5 w-5" />
              </a>
            )}
            <a href={waLink(settings.whatsapp, messages.general())} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full border border-white/20 p-2.5 hover:bg-white/10">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold-500 uppercase">Navegue</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/pacotes" className="hover:text-white">Pacotes</Link></li>
            <li><Link href="/destinos" className="hover:text-white">Destinos</Link></li>
            <li><Link href="/viagem-personalizada" className="hover:text-white">Viagem personalizada</Link></li>
            <li><Link href="/sobre" className="hover:text-white">Sobre a Crystal</Link></li>
            <li><Link href="/depoimentos" className="hover:text-white">Depoimentos</Link></li>
            <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold-500 uppercase">Fale com a gente</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={waLink(settings.whatsapp, messages.general())} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp: {formatPhone(settings.whatsapp)}
              </a>
            </li>
            {settings.email && <li><a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a></li>}
            <li>
              <a href={vip} target="_blank" rel="noopener noreferrer" className="hover:text-white">Grupo VIP Crystal World</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Crystal World Turismo
            {settings.cnpj && <> · CNPJ {settings.cnpj}</>}
            {settings.cadastur && <> · Cadastur {settings.cadastur}</>}
          </p>
          <p className="flex gap-4">
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
