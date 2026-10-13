/**
 * Recebe os leads do site e grava uma linha por solicitação na planilha.
 *
 * Como instalar:
 * 1. Crie uma planilha no Google Sheets (ex.: "Leads do site").
 * 2. Menu Extensões > Apps Script, apague o conteúdo e cole este arquivo.
 * 3. Troque SECRET abaixo por uma senha qualquer e use a mesma em SHEETS_WEBHOOK_SECRET.
 * 4. Implantar > Nova implantação > Tipo "App da Web"
 *      Executar como: Eu  |  Quem pode acessar: Qualquer pessoa
 * 5. Copie a URL gerada para SHEETS_WEBHOOK_URL (Vercel ou .env.local).
 */
const SECRET = "troque-esta-senha";

const COLUMNS = [
  ["date", "Data"],
  ["kind", "Tipo"],
  ["name", "Nome"],
  ["whatsapp", "WhatsApp"],
  ["destination", "Destino"],
  ["period", "Período"],
  ["departureCity", "Cidade de saída"],
  ["adults", "Adultos"],
  ["children", "Crianças"],
  ["childrenAges", "Idade das crianças"],
  ["travelers", "Quem vai viajar"],
  ["preferences", "Preferências"],
  ["notes", "Observações"],
  ["page", "Página de origem"],
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map((c) => c[1]));
    sheet.setFrozenRows(1);
  }
  const row = COLUMNS.map(([key]) => (key === "date" ? new Date(data.date) : data[key] || ""));
  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
