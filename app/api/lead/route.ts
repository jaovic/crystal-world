import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/whatsapp";

const MAX = 1000;
const FIELDS: (keyof LeadPayload)[] = [
  "kind", "name", "whatsapp", "destination", "departureCity", "period", "adults",
  "children", "childrenAges", "travelers", "preferences", "notes", "page",
];

const LABELS: Partial<Record<keyof LeadPayload, string>> = {
  name: "Nome", whatsapp: "WhatsApp", destination: "Destino", departureCity: "Cidade de saída", period: "Período",
  adults: "Adultos", children: "Crianças", childrenAges: "Idade das crianças", travelers: "Quem vai viajar",
  preferences: "Preferências", notes: "Observações", page: "Página de origem",
};

/**
 * Registers a quote request: appends a row to the Google Sheet (Apps Script webhook) and emails it via Resend.
 * Each destination is optional and failures are logged without failing the request,
 * because the visitor is already being sent to WhatsApp with the same information.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot preenchido = bot. Responde ok para não dar pista.
  if (body.company) return NextResponse.json({ ok: true });

  const lead = Object.fromEntries(
    FIELDS.map((k) => [k, typeof body[k] === "string" ? (body[k] as string).trim().slice(0, MAX) : ""]),
  ) as Record<keyof LeadPayload, string>;

  if (!lead.name || !lead.whatsapp) return NextResponse.json({ ok: false, error: "Nome e WhatsApp são obrigatórios" }, { status: 400 });

  const record = { date: new Date().toISOString(), ...lead };
  const tasks: Promise<unknown>[] = [];

  if (process.env.SHEETS_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...record, secret: process.env.SHEETS_WEBHOOK_SECRET ?? "" }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Sheets ${r.status}`);
      }),
    );
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    const rows = (Object.keys(LABELS) as (keyof LeadPayload)[])
      .filter((k) => lead[k])
      .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#5f6b76">${LABELS[k]}</td><td style="padding:4px 0"><b>${escapeHtml(lead[k])}</b></td></tr>`)
      .join("");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM || "Site Crystal World <onboarding@resend.dev>",
          to: process.env.LEAD_EMAIL_TO.split(",").map((s) => s.trim()),
          subject: `Nova ${lead.kind === "personalizada" ? "viagem personalizada" : "cotação"}: ${lead.name} · ${lead.destination || "destino a definir"}`,
          html: `<h2 style="font-family:sans-serif;color:#0d3768">Nova solicitação pelo site</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Resend ${r.status}`);
      }),
    );
  }

  if (tasks.length === 0) console.info("[lead] Nenhum destino configurado. Lead recebido:", record);

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] falha ao encaminhar:", r.reason));

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
