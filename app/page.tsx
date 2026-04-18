import dynamic from "next/dynamic";
import Link from "next/link";
import { AgeFilterBar } from "@/components/AgeFilterBar";
import { MasonryShowcase } from "@/components/MasonryShowcase";
import { OrbitPreviewModal } from "@/components/OrbitPreviewModal";
import { TrendingPlays } from "@/components/TrendingPlays";

const ToyOrbitHero = dynamic(
  () =>
    import("@/components/toy-orbit/ToyOrbitHero").then((m) => m.ToyOrbitHero),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 animate-pulse bg-gradient-to-b from-portal via-space to-portal"
        aria-hidden
      />
    ),
  }
);

export default function HomePage() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-portal/55 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-cream"
          >
            Toy<span className="text-accent">Verse</span>
          </Link>
          <nav
            className="font-ui hidden items-center gap-6 text-sm font-semibold text-cream/80 sm:flex"
            aria-label="Primary"
          >
            <a href="#portal" className="hover:text-cream">
              Portal
            </a>
            <a href="#trending-heading" className="hover:text-cream">
              Trending
            </a>
            <a href="#magazine-heading" className="hover:text-cream">
              Magazine
            </a>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-cream/70">
              Dashboard soon
            </span>
          </nav>
        </div>
      </header>

      <main>
        <section
          id="portal"
          className="relative min-h-[100svh] overflow-hidden bg-portal bg-space-hero"
        >
          <ToyOrbitHero className="absolute inset-0 h-full w-full" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-portal via-portal/20 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-portal/80 via-transparent to-portal/80" />

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
            <div className="max-w-2xl space-y-6 text-cream">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                The Toyverse Portal · Parents-first
              </p>
              <h1 className="font-display text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                See it. Feel it. Then buy it.
              </h1>
              <p className="text-base leading-relaxed text-cream/80 sm:text-lg">
                Every toy on ToyVerse is built around motion: 3D spins, real play
                footage, and plain-language developmental context—so checkout only
                appears after you&apos;ve actually{" "}
                <span className="font-semibold text-accent">seen the play</span>.
              </p>
              <div className="pointer-events-auto flex flex-col gap-4 sm:flex-row sm:items-center">
                <AgeFilterBar />
                <Link
                  href="#trending-heading"
                  className="font-ui inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-cream backdrop-blur hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Jump into trending plays
                </Link>
              </div>
              <p className="text-xs leading-relaxed text-cream/55">
                Prototype homepage — Supabase live counters, Stripe checkout, and
                Sanity content wire up in the next milestones.
              </p>
            </div>
          </div>
        </section>

        <TrendingPlays />
        <MasonryShowcase />
      </main>

      <footer className="border-t border-space/10 bg-cream py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-ink/65 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-ui">
            © {new Date().getFullYear()} ToyVerse · Visualize First, Buy Second
          </p>
          <p className="max-w-md text-xs">
            Child-safe framing, no dark patterns: purchase unlocks only after
            meaningful previews—designed for grown-ups buying for ages 5–12.
          </p>
        </div>
      </footer>

      <OrbitPreviewModal />
    </>
  );
}
