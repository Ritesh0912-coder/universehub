import { getGlobalUpcomingLaunches, getGlobalPastLaunches } from "@/lib/launch_service";
import LaunchCard from "@/components/LaunchCard";
import { getBlacklist } from "@/lib/actions";

export const dynamic = 'force-dynamic';

export default async function LaunchesPage() {
    const upcomingRaw = await getGlobalUpcomingLaunches();
    const pastRaw = await getGlobalPastLaunches();
    const hiddenIds = await getBlacklist("LAUNCH");

    const upcoming = upcomingRaw.filter((l: any) => !hiddenIds.includes(l.id));
    const past = pastRaw.filter((l: any) => !hiddenIds.includes(l.id));

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    Global Launch Center
                </h1>
                <p className="text-gray-400 text-lg">
                    Tracking launches from SpaceX, NASA, ISRO, and beyond.
                </p>
            </div>

            <div className="space-y-16">
                <section>
                    <h2 className="text-3xl font-orbitron font-bold text-white mb-8 border-b border-white/10 pb-4">Upcoming Launches</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcoming.map((launch: any) => (
                            <LaunchCard key={launch.id} launch={launch} />
                        ))}
                        {upcoming.length === 0 && <p className="text-gray-500">No upcoming launches scheduled found.</p>}
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
