"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";
import Earth3D from "@/components/Earth3D";
import ParticleBackground from "@/components/ParticleBackground";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main ref={containerRef} className="relative min-h-[140vh] w-full bg-black text-white overflow-hidden">
            <ParticleBackground />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0 opacity-60 md:opacity-100"
                >
                    <Earth3D />
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-none">
                    <div className="pointer-events-auto space-y-8 mt-20 md:mt-0">
                        <div className="space-y-4">
                            <h2 className="text-cyan-400 font-mono tracking-widest text-sm uppercase">Mission Status: Active</h2>
                            <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 leading-tight">
                                <DecryptedText text="Unveiling the" speed={80} maxIterations={10} revealDirection="start" />
                                <br />
                                <span className="text-blue-500">
                                    <DecryptedText text="Cosmos" speed={80} maxIterations={15} revealDirection="end" />
                                </span>
                            </h1>
                        </div>

                        <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/5">
                            UniverseHub is not just a data aggregator. It is a bridge between humanity and the infinite.
                            We fuse real-time astronomical data with immersive design to verify expanding knowledge.
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                    <span className="text-xs font-mono">SCROLL TO ANALYZE</span>
                </div>
            </section>

            {/* Content Grid Section */}
            <section className="relative z-10 w-full py-24 px-6 bg-gradient-to-b from-transparent to-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "The Engine",
                            desc: "Powered by Web developers, rendering millions of particles to simulate the depth of space in your browser.",
                            gradient: "from-blue-500/20 to-purple-500/20",
                            border: "border-blue-500/30"
                        },
                        {
                            title: "The Source",
                            desc: "Direct uplinks to NASA, SpaceX, ISRO, ESA, and global observatories ensure that what you see is verified, real-time truth.",
                            gradient: "from-cyan-500/20 to-blue-500/20",
                            border: "border-cyan-500/30"
                        },
                        {
                            title: "The Vision",
                            desc: "Democratizing space exploration. Making the complex beautiful, and the distant accessible to every explorer.",
                            gradient: "from-purple-500/20 to-pink-500/20",
                            border: "border-purple-500/30"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b ${item.gradient} p-8 border ${item.border} backdrop-blur-xl hover:-translate-y-2 transition-transform duration-500`}
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-2xl font-bold font-orbitron mb-4 text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                            <p className="text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
