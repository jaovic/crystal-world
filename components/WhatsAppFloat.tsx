"use client";

import { track } from "@/lib/analytics";
import { messages, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/** Floating WhatsApp button, shown on phones and tablets only. */
export function WhatsAppFloat({ phone }: { phone: string }) {
  return (
    <a
      href={waLink(phone, messages.general())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Renata pelo WhatsApp"
      onClick={() => track("contact", { source: "botao-flutuante" })}
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 lg:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
