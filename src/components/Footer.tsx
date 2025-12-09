"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/login') return null;

    return (
        <footer className="border-t border-white/5 bg-transparent relative z-10 backdrop-blur-sm">
            {/* Gradient Overlay for better readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Branding */}
                    <div>
                        <h3 className="text-2xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                            UniverseHub
                        </h3>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
                            Exploring the cosmos, one pixel at a time. Real-time data from NASA, SpaceX, and global space agencies.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Explore</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/news" className="hover:text-blue-400 transition-colors">Space News</a></li>
                            <li><a href="/missions" className="hover:text-blue-400 transition-colors">Missions</a></li>
                            <li><a href="/launches" className="hover:text-blue-400 transition-colors">Launch Calendar</a></li>
                            <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Credits */}

                </div>
                <div className="mt-8 border-t border-white/5 pt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} UniverseHub. Built for the stars.
                    </p>
                </div>
            </div>
        </footer>
    );
}
