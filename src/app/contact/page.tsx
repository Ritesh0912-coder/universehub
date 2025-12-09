import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                    Contact Control
                </h1>
                <p className="text-gray-400 text-lg">
                    Have a question or signal to transmit? We are listening.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="p-8">
                    <h2 className="text-2xl font-bold font-orbitron text-white mb-6 flex items-center gap-2">
                        <Mail className="w-6 h-6 text-purple-400" />
                        Get in Touch
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Frequency Name</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Major Tom" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email Coordinates</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="tom@groundcontrol.com" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Transmission</label>
                            <textarea className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white h-32 focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Message content..." />
                        </div>
                        <GlassButton className="w-full flex justify-center items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Transmission
                        </GlassButton>
                    </form>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard className="p-6">
                        <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-400" />
                            Collaborations
                        </h3>
                        <p className="text-sm text-gray-400">
                            Interested in partnering with UniverseHub? We are always looking for contributors, data scientists, and space enthusiasts.
                        </p>
                    </GlassCard>

                    <GlassCard className="p-6 bg-gradient-to-br from-purple-900/20 to-transparent">
                        <h3 className="font-bold text-lg text-white mb-2">Direct Channel</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            For urgent inquiries or press related questions.
                        </p>
                        <a href="mailto:contact@universehub.com" className="text-purple-400 hover:text-purple-300 transition-colors">contact@universehub.com</a>
                    </GlassCard>
                </div>
            </div>
        </main>
    );
}
