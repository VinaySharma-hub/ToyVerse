"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_TOYS, filterToysByAgeBand } from "@/lib/mock-toys";
import { useToyverseStore } from "@/store/use-toyverse-store";

const sizeClass: Record<string, string> = {
  sm: "sm:col-span-1 sm:min-h-[220px]",
  md: "sm:col-span-1 sm:row-span-2 sm:min-h-[320px]",
  lg: "sm:col-span-2 sm:min-h-[280px]",
};

export function MasonryShowcase() {
  const ageBand = useToyverseStore((s) => s.ageBand);
  const toys = filterToysByAgeBand(MOCK_TOYS, ageBand);

  return (
    <section
      className="bg-cream pb-24 pt-4"
      aria-labelledby="magazine-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2
          id="magazine-heading"
          className="font-display text-2xl text-ink sm:text-3xl"
        >
          Magazine picks
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/65">
          Overlapping energy without a boring grid—cards scale to spotlight hero toys.
          Filter updates instantly from the age bar above.
        </p>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {toys.map((toy, i) => (
            <motion.div
              key={toy.id}
              layout
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: Math.min(i * 0.06, 0.36),
                type: "spring",
                stiffness: 280,
                damping: 26,
              }}
              className={[
                "mb-5 break-inside-avoid overflow-hidden rounded-[28px] border border-space/10 bg-white shadow-[0_24px_60px_rgba(26,26,46,0.1)]",
                sizeClass[toy.masonrySize],
              ].join(" ")}
              whileHover={{ scale: 1.015, rotate: toy.masonrySize === "lg" ? -0.4 : 0.4 }}
            >
              <div className="relative">
                <div
                  className="flex min-h-[140px] items-center justify-center p-8 text-5xl sm:min-h-[160px]"
                  style={{
                    background: `linear-gradient(120deg, ${toy.orbitColor}55, #fff9f0 40%, ${toy.emissive}66)`,
                  }}
                >
                  <span className="font-display text-ink/25" aria-hidden>
                    {toy.orbitShape === "torus"
                      ? "◎"
                      : toy.orbitShape === "box"
                        ? "▣"
                        : toy.orbitShape === "cone"
                          ? "▲"
                          : "◆"}
                  </span>
                </div>
                <span className="font-ui absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink shadow-sm">
                  Ages {toy.ageMin}–{toy.ageMax}
                </span>
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                <h3 className="font-display text-xl text-ink">{toy.name}</h3>
                <p className="text-sm text-ink/65">{toy.shortPitch}</p>
                <div className="flex flex-wrap gap-2">
                  {toy.skillTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary/12 px-2.5 py-1 text-xs font-semibold text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="font-ui text-lg font-bold text-primary">
                    ₹{toy.price.toLocaleString("en-IN")}
                  </p>
                  <Link
                    href={`/discover/${toy.id}`}
                    className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Enter Play Floor
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
