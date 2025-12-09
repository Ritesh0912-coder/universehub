"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PlanetModel from "@/components/PlanetModel";

interface PlanetSceneProps {
    color: string;
}

export default function PlanetScene({ color }: PlanetSceneProps) {
    return (
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <PlanetModel color={color} size={2} rotationSpeed={0.005} />
            <OrbitControls enableZoom={true} />
        </Canvas>
    );
}
