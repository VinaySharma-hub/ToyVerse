export type AgeBand = "all" | "5-6" | "7-8" | "9-10" | "11-12";

export type OrbitShape = "box" | "sphere" | "torus" | "cone" | "dodecahedron";

export type Toy = {
  id: string;
  name: string;
  ageMin: number;
  ageMax: number;
  price: number;
  /** Simulated “kids explored today” counter for prototype */
  exploreToday: number;
  skillTags: string[];
  orbitShape: OrbitShape;
  orbitColor: string;
  emissive: string;
  shortPitch: string;
  masonrySize: "sm" | "md" | "lg";
};

export const MOCK_TOYS: Toy[] = [
  {
    id: "nebula-blocks",
    name: "Nebula Builder Blocks",
    ageMin: 5,
    ageMax: 8,
    price: 1899,
    exploreToday: 312,
    skillTags: ["Creativity", "Physical", "STEM"],
    orbitShape: "box",
    orbitColor: "#FF6B35",
    emissive: "#ff8f5c",
    shortPitch: "Satisfying magnetic snaps with light-up cores for evening builds.",
    masonrySize: "lg",
  },
  {
    id: "orbit-racers",
    name: "Orbit Pull-Back Racers",
    ageMin: 5,
    ageMax: 10,
    price: 799,
    exploreToday: 247,
    skillTags: ["Physical", "Social"],
    orbitShape: "sphere",
    orbitColor: "#4ECDC4",
    emissive: "#7ee8e0",
    shortPitch: "Living-room Grand Prix with chunky, grip-friendly wheels.",
    masonrySize: "md",
  },
  {
    id: "starlight-lab",
    name: "Starlight Circuit Lab",
    ageMin: 9,
    ageMax: 12,
    price: 3299,
    exploreToday: 156,
    skillTags: ["STEM", "Learning", "Creativity"],
    orbitShape: "dodecahedron",
    orbitColor: "#FFE66D",
    emissive: "#fff3a3",
    shortPitch: "Modular circuits that click together—parent-guided missions included.",
    masonrySize: "md",
  },
  {
    id: "comet-art-pod",
    name: "Comet Art Pod",
    ageMin: 6,
    ageMax: 12,
    price: 1299,
    exploreToday: 401,
    skillTags: ["Creativity", "Emotional"],
    orbitShape: "cone",
    orbitColor: "#c44dff",
    emissive: "#e0a3ff",
    shortPitch: "Travel-ready studio with washable inks and sticker physics.",
    masonrySize: "sm",
  },
  {
    id: "lunar-puzzle-atlas",
    name: "Lunar Puzzle Atlas",
    ageMin: 7,
    ageMax: 12,
    price: 999,
    exploreToday: 198,
    skillTags: ["Learning", "Emotional"],
    orbitShape: "torus",
    orbitColor: "#4ECDC4",
    emissive: "#9afbf3",
    shortPitch: "Glow-edge pieces that reveal constellations when complete.",
    masonrySize: "lg",
  },
  {
    id: "astro-drama-chest",
    name: "Astro Drama Chest",
    ageMin: 5,
    ageMax: 9,
    price: 1499,
    exploreToday: 176,
    skillTags: ["Social", "Emotional", "Creativity"],
    orbitShape: "sphere",
    orbitColor: "#FF6B35",
    emissive: "#ffb899",
    shortPitch: "Puppet-theater cards for co-play and story swaps.",
    masonrySize: "sm",
  },
];

const BAND_RANGE: Record<Exclude<AgeBand, "all">, [number, number]> = {
  "5-6": [5, 6],
  "7-8": [7, 8],
  "9-10": [9, 10],
  "11-12": [11, 12],
};

export function toyMatchesAgeBand(toy: Toy, band: AgeBand): boolean {
  if (band === "all") return true;
  const [lo, hi] = BAND_RANGE[band];
  return toy.ageMax >= lo && toy.ageMin <= hi;
}

export function filterToysByAgeBand(toys: Toy[], band: AgeBand): Toy[] {
  return toys.filter((t) => toyMatchesAgeBand(t, band));
}

export function getToyById(id: string): Toy | undefined {
  return MOCK_TOYS.find((t) => t.id === id);
}
