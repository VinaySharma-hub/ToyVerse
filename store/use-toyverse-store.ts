import { create } from "zustand";
import type { AgeBand } from "@/lib/mock-toys";

type ToyverseState = {
  ageBand: AgeBand;
  setAgeBand: (band: AgeBand) => void;
  orbitPreviewToyId: string | null;
  openOrbitPreview: (toyId: string | null) => void;
};

export const useToyverseStore = create<ToyverseState>((set) => ({
  ageBand: "all",
  setAgeBand: (ageBand) => set({ ageBand }),
  orbitPreviewToyId: null,
  openOrbitPreview: (toyId) => set({ orbitPreviewToyId: toyId }),
}));
