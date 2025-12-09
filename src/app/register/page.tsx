"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassCard from "@/components/ui/GlassCard";
import { Rocket, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { registerUser } from "@/lib/actions";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await registerUser(formData);

            if (result.success) {
                // Automatically log in the user
                const signInResult = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (signInResult?.error) {
                    setError("Registration successful but login failed. Please login manually.");
                    setTimeout(() => router.push("/login"), 2000);
                    setLoading(false); // Ensure loading is set to false here
                } else {
                    // Redirect to dashboard
                    router.push("/dashboard");
                    router.refresh();
                }
            } else {
                // Handle registration failure if registerUser returns a non-success result
                setError(result.message || "Registration failed.");
                setLoading(false);
            }
        } catch (err: any) {
            setError(err.message || "Registration failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <GlassCard className="p-8 border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                            <Rocket className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="text-3xl font-bold font-orbitron text-white mb-2">Join The Mission</h1>
                        <p className="text-gray-400 text-sm">Create your personnel profile</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Commander Shepard"
                                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-purple-500/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email your"
                                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-purple-500/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter Access Code"
                                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-purple-500/50"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/20"
                        >
                            {loading ? "Registering..." : "Initialize Profile"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have access?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 hover:underline">
                            Login here
                        </Link>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
