"use client";

import React from "react";
import { motion } from "framer-motion";
import LaunchCard from "./LaunchCard";

interface LaunchGridProps {
    launches: any[];
    emptyMessage?: string;
}

export default function LaunchGrid({ launches, emptyMessage = "No launches found." }: LaunchGridProps) {
    if (launches.length === 0) {
        return <p className="text-gray-500 italic">{emptyMessage}</p>;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {launches.map((launch) => (
                <motion.div key={launch.id} variants={item}>
                    <LaunchCard launch={launch} />
                </motion.div>
            ))}
        </motion.div>
    );
}
