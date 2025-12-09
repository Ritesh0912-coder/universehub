"use client";

import React, { useRef, useEffect, useState } from "react";

interface StarBackgroundProps {
    starCount?: number;
    speedFactor?: number;
    backgroundColor?: string;
}

export default function StarBackground({
    starCount = 500,
    speedFactor = 0.05,
    backgroundColor = "transparent",
}: StarBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let stars: { x: number; y: number; z: number; size: number }[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 2, // Depth factor
                    size: Math.random() * 2,
                });
            }
        };

        const updateStars = () => {
            ctx.fillStyle = backgroundColor;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear instead of fill if transparent

            ctx.fillStyle = "white";
            stars.forEach((star) => {
                // Move star
                star.y -= speedFactor * (star.z * 0.5 + 0.5); // Parallax effect

                // Reset if off screen
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                // Draw star
                ctx.beginPath();
                const opacity = 0.5 + Math.random() * 0.5; // Twinkle
                ctx.globalAlpha = opacity;
                ctx.arc(star.x, star.y, star.size * (star.z * 0.5 + 0.5), 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(updateStars);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        updateStars();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [starCount, speedFactor, backgroundColor]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{ background: backgroundColor }}
        />
    );
}
