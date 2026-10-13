import { formatPeriod } from "./format";
import type { Destination, TravelPackage } from "./types";

export function waLink(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: () => "Olá, Renata! Vim pelo site da Crystal World e gostaria de planejar uma viagem.",
  package: (p: TravelPackage) =>
    `Olá, Renata! Vi no site o pacote para ${p.title} de ${formatPeriod(p.startDate, p.endDate)} e gostaria de consultar a disponibilidade.`,
  destination: (d: Destination) =>
    `Olá, Renata! Vi no site a página de ${d.name} e gostaria de uma cotação de viagem para lá.`,
  vip: () => "Olá, Renata! Vim pelo site e quero entrar para o Grupo VIP Crystal World.",
};

export type LeadPayload = {
  kind: "cotacao" | "personalizada";
  name: string;
  whatsapp: string;
  destination?: string;
  departureCity?: string;
  period?: string;
  adults?: string;
  children?: string;
  childrenAges?: string;
  travelers?: string;
  preferences?: string;
  notes?: string;
  page?: string;
};

export function leadMessage(l: LeadPayload) {
  const lines = [
    `Olá, Renata! Meu nome é ${l.name} e enviei uma solicitação de ${l.kind === "personalizada" ? "viagem personalizada" : "cotação"} pelo site.`,
    l.destination && `Destino: ${l.destination}`,
    l.period && `Período: ${l.period}`,
    l.departureCity && `Saindo de: ${l.departureCity}`,
    l.travelers && `Quem vai: ${l.travelers}`,
    l.adults && `Adultos: ${l.adults}`,
    l.children && l.children !== "0" && `Crianças: ${l.children}${l.childrenAges ? ` (idades: ${l.childrenAges})` : ""}`,
    l.preferences && `Preferências: ${l.preferences}`,
    l.notes && `Observações: ${l.notes}`,
  ];
  return lines.filter(Boolean).join("\n");
}
