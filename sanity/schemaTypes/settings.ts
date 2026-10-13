import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    defineField({
      name: "whatsapp",
      title: "WhatsApp oficial (só números, com DDI e DDD)",
      type: "string",
      description: "Ex.: 5531997053568",
      validation: (r) => r.required(),
    }),
    defineField({ name: "phone", title: "Telefone fixo", type: "string" }),
    defineField({ name: "vipGroupUrl", title: "Link do Grupo VIP no WhatsApp", type: "url" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "instagram", title: "Instagram (URL)", type: "url" }),
    defineField({ name: "facebook", title: "Facebook (URL)", type: "url" }),
    defineField({ name: "tiktok", title: "TikTok (URL)", type: "url" }),
    defineField({ name: "address", title: "Endereço / formato de atendimento", type: "string" }),
    defineField({ name: "hours", title: "Horário de atendimento", type: "string" }),
    defineField({ name: "cnpj", title: "CNPJ", type: "string" }),
    defineField({ name: "cadastur", title: "Cadastur", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Configurações do site" }) },
});
