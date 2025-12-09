"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from 'react';

interface PlanetProps {
    color?: string;
    size?: number;
    rotationSpeed?: number;
}

export default function PlanetModel({ color = "#3b82f6", size = 2, rotationSpeed = 0.005, children }: PlanetProps & { children?: React.ReactNode }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += rotationSpeed * 0.8;
            atmosphereRef.current.rotation.z += rotationSpeed * 0.5;
        }
    });

    return (
        <group>
            {/* Core Planet */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[size, 64, 64]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.7}
                    metalness={0.2}
                    emissive={color}
                    emissiveIntensity={0.2}
                    wireframe={false}
                />
            </mesh>

            {/* Wireframe Overlay / Atmosphere */}
            <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    wireframe
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Glow Effect */}
            <mesh scale={[1.4, 1.4, 1.4]}>
                <sphereGeometry args={[size, 64, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            {children}
        </group>
    );
}
