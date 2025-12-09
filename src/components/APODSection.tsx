"use client";

import { motion } from "framer-motion";

interface APODProps {
    data: any;
}

export default function APODSection({ data }: APODProps) {
    if (!data) return null;

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden h-[600px] shadow-2xl group border border-white/10"
                >
                    {data.media_type === "image" ? (
                        <img src={data.hdurl || data.url} alt={data.title} className="w-full h-full object-cover" />
                    ) : (
                        <iframe src={data.url} title={data.title} className="w-full h-full" allowFullScreen />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <span className="text-blue-400 font-bold tracking-wider text-sm mb-2 uppercase">Astronomy Picture of the Day</span>
                        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">{data.title}</h2>
                        <p className="text-gray-300 max-w-2xl text-lg hidden md:block line-clamp-3">
                            {data.explanation}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
