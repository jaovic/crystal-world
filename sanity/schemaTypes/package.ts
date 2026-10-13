import { defineField, defineType } from "sanity";
import { categoryOptions, scopeOptions } from "./options";

export const travelPackage = defineType({
  name: "travelPackage",
  title: "Pacotes",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Destino / nome do pacote", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Endereço (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "active", title: "Publicado no site", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Destaque na Home", type: "boolean", initialValue: false, description: "Mantenha de 4 a 6 pacotes em destaque." }),
    defineField({ name: "scope", title: "Tipo", type: "string", options: { list: scopeOptions, layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "categories", title: "Categorias", type: "array", of: [{ type: "string" }], options: { list: categoryOptions } }),
    defineField({ name: "destination", title: "Página de destino relacionada", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "startDate", title: "Data de ida", type: "date", validation: (r) => r.required() }),
    defineField({ name: "endDate", title: "Data de volta", type: "date", validation: (r) => r.required() }),
    defineField({ name: "nights", title: "Noites", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "departureCity", title: "Cidade de saída", type: "string", initialValue: "Belo Horizonte (CNF)" }),
    defineField({ name: "summary", title: "Resumo", type: "text", rows: 2 }),
    defineField({ name: "images", title: "Galeria de fotos", type: "array", of: [{ type: "image", options: { hotspot: true } }], validation: (r) => r.min(1) }),
    defineField({ name: "included", title: "Itens inclusos", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "hotel", title: "Hospedagem", type: "string" }),
    defineField({ name: "hotelDescription", title: "Sobre a hospedagem", type: "text", rows: 3 }),
    defineField({ name: "priceFrom", title: "Valor a partir de (R$)", type: "number", description: "Deixe vazio para exibir \"sob consulta\"." }),
    defineField({ name: "priceNote", title: "Observação do valor", type: "string", initialValue: "por pessoa, em apartamento duplo" }),
    defineField({ name: "paymentConditions", title: "Condições de pagamento", type: "text", rows: 2 }),
    defineField({ name: "importantInfo", title: "Informações importantes e regras", type: "array", of: [{ type: "string" }] }),
  ],
  orderings: [{ title: "Data de ida", name: "startAsc", by: [{ field: "startDate", direction: "asc" }] }],
  preview: {
    select: { title: "title", start: "startDate", media: "images.0", active: "active" },
    prepare: ({ title, start, media, active }) => ({
      title,
      subtitle: `${start ?? ""}${active === false ? " · oculto" : ""}`,
      media,
    }),
  },
});
