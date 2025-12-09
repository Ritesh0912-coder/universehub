import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "standard" | "neon";
}

export default function GlassCard({
    children,
    className,
    variant = "neon",
    ...props
}: GlassCardProps) {
    const variants = {
        standard: "bg-white/10 border-white/10 backdrop-blur-md",
        neon: "bg-black/40 border-cyan-500/50 backdrop-blur-xl shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-cyan-400/80 transition-all duration-500"
    };

    return (
        <div
            className={cn(
                "rounded-2xl border overflow-hidden relative",
                variants[variant],
                className
            )}
            {...props}
        >
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Subtle corner glow for neon variant */}
            {variant === 'neon' && (
                <>
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                </>
            )}

            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
