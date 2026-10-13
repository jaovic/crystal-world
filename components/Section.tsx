export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className={`eyebrow ${light ? "!text-gold-500" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-2 font-display text-3xl leading-tight md:text-[2.6rem] ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {text && <p className={`mt-3 text-base md:text-lg ${light ? "text-white/80" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-sky-50">
      <div className="container-site py-14 md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-navy-900 md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg text-muted">{text}</p>}
        {children}
      </div>
    </section>
  );
}
