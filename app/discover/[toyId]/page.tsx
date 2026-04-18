import Link from "next/link";
import { notFound } from "next/navigation";
import { getToyById } from "@/lib/mock-toys";

type PageProps = { params: { toyId: string } };

export default function DiscoverToyPage({ params }: PageProps) {
  const toy = getToyById(params.toyId);
  if (!toy) notFound();

  return (
    <main className="min-h-screen bg-cream px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Play Floor (scaffold)
        </p>
        <h1 className="font-display mt-2 text-4xl text-ink">{toy.name}</h1>
        <p className="mt-3 text-ink/70">{toy.shortPitch}</p>
        <div className="mt-8 rounded-3xl border border-space/10 bg-white p-6 shadow-lg">
          <p className="text-sm text-ink/70">
            Next implementation slice: split-view 3D viewer, chapterized play
            video, Play IQ radar, and the unlock-to-buy gate tied to watch/rotate
            progress—plus Supabase-backed counters.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-space px-5 py-2.5 text-sm font-bold text-cream hover:bg-space/90"
          >
            ← Back to portal
          </Link>
        </div>
      </div>
    </main>
  );
}
