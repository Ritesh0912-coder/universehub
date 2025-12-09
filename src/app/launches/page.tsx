import { getUpcomingLaunches, getPastLaunches } from "@/lib/spacex";
import LaunchCard from "@/components/LaunchCard";
// Tabs import removed
// Using sections layout
// I'll implementing a simple Client Component for Tabs OR just two sections.
// Let's use two sections for simplicity to avoid creating complex UI lib components now.

export default async function LaunchesPage() {
    const upcoming = await getUpcomingLaunches();
    const past = await getPastLaunches();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    Launch Center
                </h1>
                <p className="text-gray-400 text-lg">
                    Countdown to the future.
                </p>
            </div>

            <div className="space-y-16">
                <section>
                    <h2 className="text-3xl font-orbitron font-bold text-white mb-8 border-b border-white/10 pb-4">Upcoming Launches</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcoming.map((launch: any) => (
                            <LaunchCard key={launch.id} launch={launch} />
                        ))}
                        {upcoming.length === 0 && <p className="text-gray-500">No upcoming launches scheduled.</p>}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-orbitron font-bold text-white mb-8 border-b border-white/10 pb-4">Recent Missions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {past.map((launch: any) => (
                            <LaunchCard key={launch.id} launch={launch} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
