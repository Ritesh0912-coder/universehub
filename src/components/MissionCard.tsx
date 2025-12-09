"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock, Rocket, Info } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface MissionCardProps {
    mission: {
        id: string;
        name: string;
        description: string;
        launchDate: Date | null;
        status: string;
        agency: string | null;
        imageUrl: string | null;
    };
}

export default function MissionCard({ mission }: MissionCardProps) {
    return (
        <SpotlightCard
            className="relative bg-space-light/30 backdrop-blur-md rounded-xl p-6 border border-white/10 overflow-hidden h-full flex flex-col"
            spotlightColor="rgba(168, 85, 247, 0.15)"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${mission.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                mission.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-gray-500/20 text-gray-400'
                            }`}>
                            {mission.status}
                        </span>
                        <h3 className="text-xl font-bold font-orbitron text-white">
                            {mission.name}
                        </h3>
                    </div>
                    {mission.agency && (
                        <span className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded">
                            {mission.agency}
                        </span>
                    )}
                </div>

                <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-1">
                    {mission.description}
                </p>

                <div className="space-y-2 text-sm text-gray-400 mt-auto">
                    {mission.launchDate && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span>{format(new Date(mission.launchDate), "PPP")}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-400" />
                        <span>Details Available</span>
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
}
