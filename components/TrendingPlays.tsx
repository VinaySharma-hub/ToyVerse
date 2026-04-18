"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_TOYS, filterToysByAgeBand } from "@/lib/mock-toys";
import { useToyverseStore } from "@/store/use-toyverse-store";

export function TrendingPlays() {
  const ageBand = useToyverseStore((s) => s.ageBand);
  const toys = filterToysByAgeBand(MOCK_TOYS, ageBand);

  return (
    <section
      className="border-t border-space/10 bg-cream pb-16 pt-12"
      aria-labelledby="trending-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="trending-heading"
              className="font-display text-2xl text-ink sm:text-3xl"
            >
              Trending plays
            </h2>
            <p className="mt-1 max-w-xl text-sm text-ink/65">
              Live-feel counters prototype the Supabase realtime feed you sketched—
              each card is a doorway into the full visualization journey.
            </p>
          </div>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            Swipe →
          </p>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {toys.map((toy, i) => (
            <motion.article
              key={toy.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 320, damping: 28 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="min-w-[260px] max-w-[280px] shrink-0 rounded-3xl border border-space/8 bg-white p-4 shadow-[0_18px_50px_rgba(26,26,46,0.08)]"
            >
              <div
                className="mb-3 flex h-32 items-center justify-center rounded-2xl text-4xl"
                style={{
                  background: `linear-gradient(135deg, ${toy.orbitColor}33, ${toy.emissive}44)`,
                }}
                aria-hidden
              >
                <span className="font-display text-ink/80">{toy.name[0]}</span>
              </div>
              <h3 className="font-display text-lg text-ink">{toy.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink/60">
                {toy.shortPitch}
              </p>
              <p className="font-ui mt-3 text-xs font-semibold text-primary">
                {toy.exploreToday} kids explored this today
              </p>
              <Link
                href={`/discover/${toy.id}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-space px-4 py-2.5 text-sm font-bold text-cream hover:bg-space/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Visualize first
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
