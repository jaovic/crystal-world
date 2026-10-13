import { Check, WhatsAppIcon } from "./Icons";

export function LeadSuccess({ href }: { href: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-8 text-center" role="status">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-navy-800">
        <Check className="h-7 w-7" />
      </div>
      <h3 className="mt-4 font-display text-2xl text-navy-900">Recebemos sua solicitação!</h3>
      <p className="mx-auto mt-2 max-w-md text-muted">
        A Renata é responsável pelas cotações e pelo fechamento das viagens e dará continuidade ao seu atendimento pelo WhatsApp.
      </p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6">
        <WhatsAppIcon /> Abrir conversa no WhatsApp
      </a>
      <p className="mt-3 text-xs text-muted">Se o WhatsApp não abriu automaticamente, toque no botão acima.</p>
    </div>
  );
}
