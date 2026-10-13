import type { Metadata } from "next";
import { FinalCta, TestimonialCard } from "@/components/HomeSections";
import { PageHero } from "@/components/Section";
import { getSettings, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Depoimentos",
  description: "Experiências reais de clientes que viajaram com a Crystal World Turismo.",
};

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([getTestimonials(), getSettings()]);
  return (
    <>
      <PageHero eyebrow="Depoimentos" title="Quem viajou com a gente conta" text="Experiências reais de clientes que planejaram suas viagens com a Crystal World." />
      <section className="container-site py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </section>
      <FinalCta settings={settings} />
    </>
  );
}
