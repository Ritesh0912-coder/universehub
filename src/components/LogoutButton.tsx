"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full 
                       bg-gradient-to-r from-red-600/20 to-orange-600/20 
                       border border-red-500/30 hover:border-red-400/60
                       text-red-400 hover:text-red-300
                       transition-all duration-300 ease-out
                       hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
                       hover:scale-105 active:scale-95"
        >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="font-medium text-sm tracking-wide">Log Out</span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 via-red-500/10 to-orange-500/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
        </button>
    );
}
