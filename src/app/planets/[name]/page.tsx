import { getPlanet } from "@/lib/planets";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PlanetScene from "@/components/PlanetScene";

interface PageProps {
    params: { name: string };
}

export default function PlanetPage({ params }: PageProps) {
    const planet = getPlanet(params.name);

    if (!planet) {
        return notFound();
    }

    return (
        <div className="h-screen w-full relative overflow-hidden flex flex-col md:flex-row">
            <Link href="/" className="absolute top-24 left-8 z-20 text-white flex items-center gap-2 hover:text-blue-400">
                <ArrowLeft /> Back to Universe
            </Link>

            {/* 3D View */}
            <div className="h-1/2 md:h-full w-full md:w-3/5 relative z-10">
                <PlanetScene color={planet.color} />
            </div>

            {/* Info Panel */}
            <div className="h-1/2 md:h-full w-full md:w-2/5 md:bg-space-light/10 md:backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center relative z-20 border-l border-white/5">
                <h1 className="text-6xl font-orbitron font-bold text-white mb-2">{planet.name}</h1>
                <div className="w-20 h-1 bg-blue-500 mb-8" />

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {planet.desc}
                </p>

                <div className="space-y-6">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Radius</span>
                        <span className="text-white font-mono">{planet.size} km</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Gravity</span>
                        <span className="text-white font-mono">{planet.gravity}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
