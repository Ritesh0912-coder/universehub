"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    revealDirection?: "start" | "end" | "center";
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    className,
    revealDirection = "start"
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAnimation = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / maxIterations * 2; // Adjust speed of reveal relative to scramble
        }, speed);
    };

    useEffect(() => {
        startAnimation();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    return (
        <motion.span
            className={className}
            onMouseEnter={startAnimation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {displayText}
        </motion.span>
    );
}
