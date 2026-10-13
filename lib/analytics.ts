type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a conversion event to GA4 and Meta Pixel (when configured).
 * - "contact": clique em CTA de WhatsApp
 * - "lead": envio de formulário de cotação
 */
export function track(event: "contact" | "lead" | "vip", params: Params = {}) {
  if (typeof window === "undefined") return;
  const metaEvent = { contact: "Contact", lead: "Lead", vip: "CompleteRegistration" }[event];
  const gaEvent = { contact: "whatsapp_click", lead: "generate_lead", vip: "join_group" }[event];
  window.gtag?.("event", gaEvent, params);
  window.fbq?.("track", metaEvent, params);
}
