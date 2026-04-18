"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { getToyById } from "@/lib/mock-toys";
import { useToyverseStore } from "@/store/use-toyverse-store";

export function OrbitPreviewModal() {
  const toyId = useToyverseStore((s) => s.orbitPreviewToyId);
  const close = useToyverseStore((s) => s.openOrbitPreview);
  const toy = toyId ? getToyById(toyId) : undefined;

  useEffect(() => {
    if (!toyId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toyId, close]);

  return (
    <AnimatePresence>
      {toy && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-space/75 backdrop-blur-sm"
            aria-label="Close preview"
            onClick={() => close(null)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="orbit-preview-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 m-4 w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#1a1a2e] via-[#12122a] to-[#0a0a2e] p-6 text-cream shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div
              className="mb-4 h-28 rounded-2xl opacity-90"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${toy.orbitColor}, transparent 55%), radial-gradient(circle at 80% 60%, ${toy.emissive}, transparent 50%)`,
              }}
              aria-hidden
            />
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Portal preview
            </p>
            <h2 id="orbit-preview-title" className="font-display mt-1 text-2xl text-cream">
              {toy.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/75">
              {toy.shortPitch}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {toy.skillTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-cream/90"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-cream/55">
              ToyVerse rule: you&apos;ll explore video + 3D on the Play Floor before
              purchase unlocks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/discover/${toy.id}`}
                className="inline-flex flex-1 min-w-[140px] items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-bold text-white shadow-[0_14px_40px_rgba(255,107,53,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => close(null)}
              >
                Open Play Floor
              </Link>
              <button
                type="button"
                onClick={() => close(null)}
                className="inline-flex flex-1 min-w-[120px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-cream hover:bg-white/10"
              >
                Keep exploring
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
