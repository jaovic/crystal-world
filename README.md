# Crystal World Turismo · site

Site institucional e comercial da Crystal World Turismo, construído a partir do documento de escopo.
O objetivo é levar o visitante até o WhatsApp da Renata com o contexto do que ele procura:

Instagram / Google → Site → Pacote ou destino → Interesse → WhatsApp → Cotação → Fechamento

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Sanity (painel em `/studio`) · Vercel.

## Rodar localmente

```bash
npm install --ignore-scripts   # veja a nota sobre esbuild abaixo
cp .env.example .env.local
npm run dev                    # http://localhost:3000
```

Sem `NEXT_PUBLIC_SANITY_PROJECT_ID`, o site usa os dados de exemplo de `data/seed.json`, e os leads
aparecem no terminal. Dá para revisar o site inteiro sem criar nenhuma conta.

> No Windows, se `npm install` falhar no `esbuild`, use `npm install --ignore-scripts`. O esbuild só é
> usado pela CLI do Sanity, não pelo site.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Banner, pacotes em destaque, tipos de viagem, cotação, por que a Crystal, depoimentos, Grupo VIP, CTA |
| `/pacotes` | Lista com filtros (nacional/internacional, praia, família, feriados, resorts, a dois, mês, destino, cidade de saída) |
| `/pacotes/[slug]` | Galeria, inclusos, hospedagem, investimento, regras e CTA com mensagem do pacote |
| `/destinos` e `/destinos/[slug]` | Descoberta de destinos, conteúdo, experiências da Renata, pacotes relacionados e cotação |
| `/viagem-personalizada` | Formulário em 3 etapas |
| `/sobre`, `/depoimentos`, `/contato` | Institucional |
| `/privacidade`, `/termos` | Textos provisórios (Fase 2: revisar com apoio jurídico) |
| `/studio` | Painel de edição (Sanity) |

Pacotes cuja data de volta já passou saem do site sozinhos.

## Como os leads funcionam

Ao enviar um formulário, o navegador:
1. envia os dados para `POST /api/lead`, que grava uma linha no **Google Sheets** e manda um **e-mail** (Resend);
2. abre o **WhatsApp** da Renata com a mensagem já preenchida.

Se a planilha ou o e-mail falharem, o WhatsApp abre do mesmo jeito. Os botões de WhatsApp dos pacotes e destinos
abrem com mensagens como *"Olá, Renata! Vi no site o pacote para Porto de Galinhas de 01 a 06/12 e gostaria de
consultar a disponibilidade."*, assim ela sabe qual página gerou o contato.

## Colocar no ar

1. **Sanity:** crie um projeto em [sanity.io/manage](https://www.sanity.io/manage) (plano gratuito).
   - Copie o Project ID para `NEXT_PUBLIC_SANITY_PROJECT_ID`.
   - Em *API → CORS origins*, adicione `http://localhost:3000` e o domínio do site, com *Allow credentials*.
   - Importe os dados de exemplo (opcional):
     ```bash
     node scripts/seed-to-ndjson.mjs
     npx sanity dataset import seed.ndjson production
     ```
   - Webhook para atualizar o site na hora: *API → Webhooks*, URL `https://SEU-DOMINIO/api/revalidate?secret=SEU_SEGREDO`,
     disparo em create/update/delete. Use o mesmo segredo em `SANITY_REVALIDATE_SECRET`.
2. **Planilha:** siga as instruções no topo de [`docs/google-apps-script.gs`](docs/google-apps-script.gs) e preencha
   `SHEETS_WEBHOOK_URL` e `SHEETS_WEBHOOK_SECRET`.
3. **E-mail:** crie uma conta no [Resend](https://resend.com), verifique o domínio e preencha `RESEND_API_KEY`,
   `LEAD_EMAIL_TO` e `LEAD_EMAIL_FROM`.
4. **Medição:** `NEXT_PUBLIC_GA_ID` (GA4) e `NEXT_PUBLIC_META_PIXEL_ID`. Eventos enviados: clique em WhatsApp
   (`whatsapp_click` / `Contact`), formulário enviado (`generate_lead` / `Lead`) e Grupo VIP (`join_group` / `CompleteRegistration`).
5. **Vercel:** importe o repositório, cadastre as variáveis de `.env.example` e aponte o domínio.

## O que a Crystal precisa fornecer (seção 18 do escopo)

Pelo painel, em **Configurações do site**:
- [ ] Número oficial de WhatsApp (hoje: o mesmo do site atual, (31) 99705-3568)
- [ ] Link do Grupo VIP (sem link, o botão abre conversa com a Renata pedindo para entrar)
- [ ] E-mail oficial
- [ ] Endereço e formato de atendimento
- [ ] Horário de atendimento
- [ ] CNPJ e Cadastur (rodapé)

Conteúdo:
- [ ] Pacotes reais: os de `data/seed.json` são **exemplos** (datas, valores e hotéis ilustrativos)
- [ ] Depoimentos reais (o primeiro pode ser o de Gramado)
- [ ] Foto da Renata para a página Sobre (`app/(site)/sobre/page.tsx`)
- [ ] Fotos próprias de destinos e experiências (as atuais são do Unsplash)
