"use client";

import { motion } from "framer-motion";
import type { AgeBand } from "@/lib/mock-toys";
import { useToyverseStore } from "@/store/use-toyverse-store";

const BANDS: { id: AgeBand; label: string }[] = [
  { id: "5-6", label: "5–6" },
  { id: "7-8", label: "7–8" },
  { id: "9-10", label: "9–10" },
  { id: "11-12", label: "11–12" },
];

export function AgeFilterBar() {
  const ageBand = useToyverseStore((s) => s.ageBand);
  const setAgeBand = useToyverseStore((s) => s.setAgeBand);

  return (
    <div
      className="font-ui flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-[#0a0a2e]/55 p-1.5 pl-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
      role="group"
      aria-label="Filter toys by age band"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/70">
        Ages
      </span>
      <div className="flex flex-wrap gap-1">
        {BANDS.map((b) => {
          const active = ageBand === b.id;
          return (
            <motion.button
              key={b.id}
              type="button"
              onClick={() => setAgeBand(b.id)}
              aria-pressed={active}
              whileTap={{ scale: 0.97 }}
              className={[
                "relative rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                active
                  ? "text-ink"
                  : "text-cream/85 hover:bg-white/10 hover:text-cream",
              ].join(" ")}
            >
              {active && (
                <motion.span
                  layoutId="age-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[0_0_0_1px_rgba(255,230,109,0.35)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{b.label} yrs</span>
            </motion.button>
          );
        })}
        <button
          type="button"
          onClick={() => setAgeBand("all")}
          aria-pressed={ageBand === "all"}
          className={[
            "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
            ageBand === "all"
              ? "bg-secondary/90 text-space ring-2 ring-white/25"
              : "text-cream/85 hover:bg-white/10",
          ].join(" ")}
        >
          All stages
        </button>
      </div>
    </div>
  );
}
