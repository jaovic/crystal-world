import type { Category, Scope } from "./types";

export const CATEGORY_LABELS: Record<Category, string> = {
  praia: "Praia",
  familia: "Família",
  feriados: "Feriados",
  resorts: "Resorts",
  "a-dois": "Viagens a dois",
};

export const SCOPE_LABELS: Record<Scope, string> = {
  nacional: "Nacional",
  internacional: "Internacional",
};

export const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "01 a 06/12" or "28/12 a 03/01/2027" */
export function formatPeriod(start: string, end: string) {
  const a = parts(start);
  const b = parts(end);
  if (a.y === b.y && a.m === b.m) return `${pad(a.d)} a ${pad(b.d)}/${pad(b.m)}`;
  if (a.y === b.y) return `${pad(a.d)}/${pad(a.m)} a ${pad(b.d)}/${pad(b.m)}`;
  return `${pad(a.d)}/${pad(a.m)}/${a.y} a ${pad(b.d)}/${pad(b.m)}/${b.y}`;
}

export function monthOf(iso: string) {
  return parts(iso).m;
}

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

/** Unsplash/Sanity URLs accept w/q params; other URLs are returned untouched. */
export function img(url: string, width = 1200) {
  if (!url) return url;
  if (url.includes("images.unsplash.com")) return `${url}?w=${width}&q=75&auto=format&fit=crop`;
  if (url.includes("cdn.sanity.io")) return `${url}?w=${width}&q=75&auto=format`;
  return url;
}

export function formatPhone(digits: string) {
  const d = digits.replace(/\D/g, "").replace(/^55/, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digits;
}
