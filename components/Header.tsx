"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Close, Menu } from "./Icons";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/pacotes", label: "Pacotes" },
  { href: "/destinos", label: "Destinos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Crystal World Turismo - início">
          <Image src="/img/crystal-logo.png" alt="Crystal World Turismo" width={120} height={60} priority className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors ${isActive(item.href) ? "text-navy-800" : "text-muted hover:text-navy-800"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contato#cotacao" className="btn btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
            Solicite uma cotação
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 text-navy-800 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white lg:hidden" aria-label="Menu móvel">
          <div className="container-site flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 text-base font-semibold ${isActive(item.href) ? "text-navy-800" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/viagem-personalizada" className="py-3 text-base font-semibold text-ink">
              Viagem personalizada
            </Link>
            <Link href="/contato#cotacao" className="btn btn-gold mt-3 mb-2">
              Solicite uma cotação
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
