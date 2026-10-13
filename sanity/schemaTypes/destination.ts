import { defineField, defineType } from "sanity";
import { categoryOptions, scopeOptions } from "./options";

export const destination = defineType({
  name: "destination",
  title: "Destinos",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Endereço (URL)", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "scope", title: "Tipo", type: "string", options: { list: scopeOptions, layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "image", title: "Foto de capa", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "categories", title: "Perfis de viagem", type: "array", of: [{ type: "string" }], options: { list: categoryOptions } }),
    defineField({ name: "why", title: "Por que conhecer", type: "text", rows: 4 }),
    defineField({ name: "highlights", title: "O que conhecer", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "bestTime", title: "Melhor época para viajar", type: "text", rows: 3 }),
    defineField({
      name: "experiences",
      title: "Experiências da Renata",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "text", title: "Texto", type: "text", rows: 3 },
            { name: "image", title: "Foto", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "scope", media: "image" } },
});
