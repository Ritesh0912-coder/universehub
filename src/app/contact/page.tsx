"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    };

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

                    {status === "success" ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="flex justify-center">
                                <CheckCircle className="w-16 h-16 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Transmission Sent!</h3>
                            <p className="text-gray-400 text-sm">We have received your signal. Stand by for a response.</p>
                            <GlassButton onClick={() => setStatus("idle")} className="mt-4">
                                Send Another
                            </GlassButton>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Frequency Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Major Tom"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email Coordinates</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="tom@groundcontrol.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Transmission</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white h-32 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                    placeholder="Message content..."
                                />
                            </div>

                            {status === "error" && (
                                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded flex items-center gap-2 text-red-200 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {errorMessage}
                                </div>
                            )}

                            <GlassButton disabled={status === "loading"} className="w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {status === "loading" ? (
                                    <span>Transmitting...</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Transmission
                                    </>
                                )}
                            </GlassButton>
                        </form>
                    )}
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
