import GlassCard from "@/components/ui/GlassCard";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-4">
                    About UniverseHub
                </h1>
                <p className="text-gray-400 text-lg">
                    Our mission: To verify existing knowledge and bring the cosmos closer to you.
                </p>
            </div>

            <div className="space-y-8">
                <GlassCard className="p-8">
                    <h2 className="text-2xl font-bold font-orbitron text-white mb-4">The Mission</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        UniverseHub was born from a passion for space exploration and a desire to make astronomical data accessible, beautiful, and engaging. We aggregate real-time data from NASA, SpaceX, and major observatories to provide a unified platform for space enthusiasts.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        Whether tracking the next Starship launch, admiring the Astronomy Picture of the Day, or reading the latest scientific discoveries, UniverseHub is your portal to the stars.
                    </p>
                </GlassCard>

                <GlassCard className="p-8">
                    <h2 className="text-2xl font-bold font-orbitron text-white mb-4">Technology</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Built with the latest web technologies, UniverseHub leverages Next.js 14, Tailwind CSS, and WebGL to deliver a high-performance, immersive experience. We believe that learning about space should feel like part of the journey.
                    </p>
                </GlassCard>
            </div>
        </main>
    );
}
