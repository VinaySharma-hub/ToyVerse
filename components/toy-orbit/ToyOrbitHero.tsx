"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ToyOrbitScene } from "./ToyOrbitScene";

type ToyOrbitHeroProps = {
  className?: string;
};

export function ToyOrbitHero({ className }: ToyOrbitHeroProps) {
  return (
    <div
      className={className}
      role="img"
      aria-label="ToyVerse portal: slow-moving 3D toys in orbit. Click a toy to open its preview."
    >
      <Canvas
        camera={{ position: [0, 1.2, 9.25], fov: 46, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ToyOrbitScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
