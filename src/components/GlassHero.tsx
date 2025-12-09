import GlassCard from "./ui/GlassCard";
import GlassButton from "./ui/GlassButton";
import { ArrowRight } from "lucide-react";
import Earth3D from "./Earth3D";

export default function GlassHero() {
    return (
        <div className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
            {/* 3D Background - Now positioned to the right for "Side Control" */}
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-0">
                <Earth3D />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content - Left Aligned */}
                <div className="text-left space-y-8 pt-20">
                    <h1 className="text-4xl md:text-7xl font-bold font-orbitron tracking-tighter text-white drop-shadow-2xl select-none leading-tight">
                        EXPLORE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse-slow">
                            THE UNIVERSE
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-cyan-100/80 max-w-lg leading-relaxed drop-shadow-lg">
                        Dive into the infinite cosmos. Discover real-time space news, track missions, and witness the beauty of the galaxy like never before.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <GlassButton className="px-8 py-3 text-lg flex items-center gap-2 group/btn bg-blue-600/20 hover:bg-blue-600/40 border-blue-500/50">
                            Start Journey
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </GlassButton>

                        <GlassButton variant="outline" className="px-8 py-3 text-lg border-cyan-500/30 text-cyan-400 hover:text-cyan-200">
                            Mission Control
                        </GlassButton>
                    </div>
                </div>

                {/* Right side is reserved for the 3D Earth interaction area */}
                <div className="hidden md:block h-full" />
            </div>
        </div>
    );
}
