import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site py-28 text-center">
      <p className="eyebrow">Página não encontrada</p>
      <h1 className="mt-3 font-display text-4xl text-navy-900">Esse destino saiu do roteiro</h1>
      <p className="mt-3 text-muted">O pacote pode ter sido encerrado ou o endereço mudou.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/pacotes" className="btn btn-primary">Ver pacotes disponíveis</Link>
        <Link href="/viagem-personalizada" className="btn btn-gold">Planejar minha viagem</Link>
      </div>
    </section>
  );
}
