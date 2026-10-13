"use client";

import Image from "next/image";
import { useState } from "react";
import { img } from "@/lib/format";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sky-50">
        <Image src={img(images[active], 1600)} alt={`${alt} - foto ${active + 1}`} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === active ? "ring-navy-800" : "ring-transparent opacity-70 hover:opacity-100"}`}
            >
              <Image src={img(src, 200)} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
