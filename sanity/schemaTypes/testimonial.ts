import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimentos",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome do cliente", type: "string", validation: (r) => r.required() }),
    defineField({ name: "destination", title: "Destino", type: "string" }),
    defineField({ name: "text", title: "Depoimento", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "image", title: "Foto da viagem (com autorização)", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "destination", media: "image" } },
});
