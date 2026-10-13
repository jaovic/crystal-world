"use client";

import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "./Icons";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Identifies which CTA generated the contact (e.g. "pacote:porto-de-galinhas"). */
  source: string;
  event?: "contact" | "vip";
  icon?: boolean;
};

export function WaButton({ href, children, className = "btn btn-whatsapp", source, event = "contact", icon = true }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track(event, { source })}
    >
      {icon && <WhatsAppIcon className="h-5 w-5" />}
      {children}
    </a>
  );
}
