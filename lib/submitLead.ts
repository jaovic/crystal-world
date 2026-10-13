"use client";

import { track } from "./analytics";
import { leadMessage, waLink, type LeadPayload } from "./whatsapp";

/**
 * Registers the lead (planilha + e-mail via /api/lead) and opens the WhatsApp chat.
 * The request uses keepalive so it completes even if the browser switches to the WhatsApp app,
 * and window.open runs synchronously inside the submit gesture so popup blockers allow it.
 * Returns the WhatsApp link so the confirmation screen can offer it as a fallback.
 */
export function submitLead(phone: string, lead: LeadPayload, honeypot = "") {
  const payload = { ...lead, page: window.location.pathname, company: honeypot };
  fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* WhatsApp still opens; the lead also arrives there */
  });

  track("lead", { source: lead.kind, destination: lead.destination });

  const href = waLink(phone, leadMessage(lead));
  window.open(href, "_blank", "noopener");
  return href;
}
