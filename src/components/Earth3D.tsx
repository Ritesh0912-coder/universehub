"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";

function RealisticEarth() {
    const earthRef = useRef<any>();
    const cloudsRef = useRef<any>();

    // Load textures (using reliable standard Three.js example textures)
    const [colorMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
    ]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (earthRef.current) {
            earthRef.current.rotation.y = elapsedTime * 0.05; // Rotate Earth
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = elapsedTime * 0.07; // Rotate Clouds slightly faster
        }
    });

    return (
        <>
            {/* Earth Sphere */}
            <mesh ref={earthRef} scale={2}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    specularMap={specularMap}
                    specular={0x333333}
                    shininess={15}
                />
            </mesh>

            {/* Clouds Sphere (Slightly larger) */}
            <mesh ref={cloudsRef} scale={2.03}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.8}
                    side={DoubleSide}
                    blending={2} // Additive blending for glow effect
                />
            </mesh>

            {/* Atmosphere Glow Removed as per user request */}
        </>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={1.5} /> {/* Increased for better visibility */}
            <directionalLight position={[5, 3, 5]} intensity={3} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />

            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <RealisticEarth />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
            />
        </>
    );
}

export default function Earth3D() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
