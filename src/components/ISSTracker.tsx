"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import PlanetModel from "./PlanetModel";
import { useEffect, useState, useRef } from "react";
import { getISSPosition } from "@/lib/iss";
import * as THREE from "three";
import useSWR from "swr"; // Assuming SWR is installed

function ISSMarker({ lat, lon, radius }: { lat: number; lon: number; radius: number }) {
    const meshRef = useRef<THREE.Group>(null);

    // Convert lat/lon to 3D position
    // Lat: -90 to 90, Lon: -180 to 180
    // Three.js sphere: Y is up? 
    // Usual conversion:
    // x = r * cos(lat) * sin(lon)
    // y = r * sin(lat)
    // z = r * cos(lat) * cos(lon)
    // Adjust for texture mapping if needed, but for wireframe sphere any mapping is fine as long as consistent.

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    // Note: verifying axes. typically Y is up in Three.js.
    // Lat is rotation around X/Z? No, lat is angle from equator (XZ plane) up Y.

    return (
        <group position={[x, y, z]}>
            <mesh>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial color="red" emissive="red" emissiveIntensity={1} />
            </mesh>
            <Html distanceFactor={10}>
                <div className="bg-space-black/80 border border-white/20 p-2 rounded text-xs whitespace-nowrap backdrop-blur-md">
                    ISS
                </div>
            </Html>
        </group>
    );
}

export default function ISSTracker() {
    const { data, error } = useSWR('iss', getISSPosition, { refreshInterval: 5000 });

    const lat = parseFloat(data?.iss_position?.latitude || "0");
    const lon = parseFloat(data?.iss_position?.longitude || "0");

    return (
        <div className="w-full h-[400px] relative rounded-xl overflow-hidden border border-white/10 bg-space-light/20">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-xl font-bold font-orbitron text-white">ISS Live Tracker</h3>
                <p className="text-sm text-gray-400">
                    Lat: {lat.toFixed(2)}, Lon: {lon.toFixed(2)}
                </p>
            </div>

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <PlanetModel size={2} color="#10b981">
                    <ISSMarker lat={lat} lon={lon} radius={2.2} />
                </PlanetModel>
                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
        </div>
    );
}
