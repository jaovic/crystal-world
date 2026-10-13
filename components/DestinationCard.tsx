import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/format";
import type { Destination } from "@/lib/types";

export function DestinationCard({ destination: d, size = "md" }: { destination: Destination; size?: "md" | "lg" }) {
  return (
    <Link
      href={`/destinos/${d.slug}`}
      className={`group relative block overflow-hidden rounded-2xl ${size === "lg" ? "aspect-[4/5]" : "aspect-[3/4]"}`}
    >
      <Image
        src={img(d.image, 700)}
        alt={d.name}
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="font-display text-xl leading-tight md:text-2xl">{d.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-white/80 md:text-sm">{d.subtitle}</p>
      </div>
    </Link>
  );
}
