import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Newspaper, Rocket, Activity } from "lucide-react";

export default async function AdminDashboard() {
    const userCount = await db.user.count();
    const newsCount = await db.news.count();
    const missionCount = await db.mission.count();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold font-orbitron">Mission Control Status</h2>
                <p className="text-gray-400">System metrics and overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userCount}</div>
                        <p className="text-xs text-gray-400">+20% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">News Transmission</CardTitle>
                        <Newspaper className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newsCount}</div>
                        <p className="text-xs text-gray-400">+2 since yesterday</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
                        <Rocket className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{missionCount}</div>
                        <p className="text-xs text-gray-400">All systems nominal</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Status</CardTitle>
                        <Activity className="h-4 w-4 text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">ONLINE</div>
                        <p className="text-xs text-gray-400">Uptime 99.9%</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
