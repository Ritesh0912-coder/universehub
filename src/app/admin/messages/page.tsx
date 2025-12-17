import { db } from "@/lib/db";
import GlassCard from "@/components/ui/GlassCard";
import { Mail, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
    const messages = await db.contact.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Incoming Transmissions
            </h2>

            <div className="grid gap-6">
                {messages.length === 0 ? (
                    <GlassCard className="p-8 text-center text-gray-400">
                        No messages received yet, Commander.
                    </GlassCard>
                ) : (
                    messages.map((msg) => (
                        <GlassCard key={msg.id} className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Mail className="w-3 h-3" />
                                            <a href={`mailto:${msg.email}`} className="hover:text-blue-400 transition-colors">
                                                {msg.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-black/40 px-3 py-1 rounded-full">
                                    <Calendar className="w-3 h-3" />
                                    {msg.createdAt.toLocaleDateString()} {msg.createdAt.toLocaleTimeString()}
                                </div>
                            </div>

                            <div className="bg-black/20 rounded p-4 border border-white/5 text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}
