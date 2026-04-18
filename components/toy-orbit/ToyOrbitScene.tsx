"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { MOCK_TOYS, type Toy, type OrbitShape } from "@/lib/mock-toys";
import { useToyverseStore } from "@/store/use-toyverse-store";

function ToyMesh({
  toy,
  position,
}: {
  toy: Toy;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const openOrbitPreview = useToyverseStore((s) => s.openOrbitPreview);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.35;
    meshRef.current.rotation.y += delta * 0.55;
  });

  const geometry = useMemo(() => shapeFor(toy.orbitShape), [toy.orbitShape]);

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    openOrbitPreview(toy.id);
  };

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        position={position}
        geometry={geometry}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        castShadow
      >
        <meshStandardMaterial
          color={toy.orbitColor}
          emissive={toy.emissive}
          emissiveIntensity={hovered ? 1.1 : 0.65}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

function shapeFor(shape: OrbitShape): THREE.BufferGeometry {
  switch (shape) {
    case "box":
      return new THREE.BoxGeometry(0.85, 0.85, 0.85);
    case "sphere":
      return new THREE.SphereGeometry(0.55, 32, 32);
    case "torus":
      return new THREE.TorusGeometry(0.55, 0.2, 16, 48);
    case "cone":
      return new THREE.ConeGeometry(0.55, 1.1, 32);
    case "dodecahedron":
    default:
      return new THREE.DodecahedronGeometry(0.62, 0);
  }
}

const ORBIT_TOYS = MOCK_TOYS.slice(0, 6);

function OrbitingToys() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.09;
    }
  });

  const nodes = useMemo(() => {
    const radius = 3.35;
    return ORBIT_TOYS.map((toy, i) => {
      const a = (i / ORBIT_TOYS.length) * Math.PI * 2;
      const y = Math.sin(i * 1.1) * 0.55;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;
      return <ToyMesh key={toy.id} toy={toy} position={[x, y, z]} />;
    });
  }, []);

  return <group ref={groupRef}>{nodes}</group>;
}

export function ToyOrbitScene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.15}
        color="#ffe8d6"
        castShadow
      />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#4ECDC4" />
      <pointLight position={[3, -3, -4]} intensity={0.55} color="#FF6B35" />
      <Stars
        radius={120}
        depth={60}
        count={9000}
        factor={3.5}
        saturation={0.65}
        fade
        speed={0.35}
      />
      <OrbitingToys />
    </>
  );
}
