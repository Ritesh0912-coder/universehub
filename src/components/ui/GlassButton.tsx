import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "neon";
}

export default function GlassButton({
    children,
    className,
    variant = "neon",
    ...props
}: GlassButtonProps) {
    const variants = {
        primary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        secondary: "bg-blue-600/80 hover:bg-blue-600 text-white border border-blue-400/30",
        outline: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-white/20",
        neon: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-50 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    };

    return (
        <button
            className={cn(
                "px-6 py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm active:scale-95",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
