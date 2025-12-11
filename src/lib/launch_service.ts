
export const LAUNCH_LLAPI_BASE = "https://lldev.thespacedevs.com/2.2.0";

// Interface for normalized launch data
export interface Launch {
    id: string;
    name: string;
    net: string; // ISO Date string
    status: {
        name: string;
        abbrev: string;
    };
    launch_service_provider: {
        name: string;
        type?: string;
    };
    rocket: {
        configuration: {
            name: string;
        };
    };
    mission?: {
        name: string;
        description: string;
    };
    pad: {
        name: string;
        location: {
            name: string;
        };
    };
    image: string | null;
    webcast_live: boolean;
}

export async function getGlobalUpcomingLaunches() {
    try {
        const res = await fetch(`${LAUNCH_LLAPI_BASE}/launch/upcoming/?limit=10&mode=normal`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) throw new Error(`Global Launch API Error: ${res.status}`);

        const data = await res.json();
        return data.results.map(transformLaunchData);
    } catch (error) {
        console.error("Fetch Upcoming Launches Error:", error);
        return [];
    }
}

export async function getGlobalPastLaunches() {
    try {
        const res = await fetch(`${LAUNCH_LLAPI_BASE}/launch/previous/?limit=10&mode=normal`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) throw new Error(`Global Launch API Error: ${res.status}`);

        const data = await res.json();
        return data.results.map(transformLaunchData);
    } catch (error) {
        console.error("Fetch Past Launches Error:", error);
        return [];
    }
}

function transformLaunchData(item: any) {
    return {
        id: item.id,
        name: item.name,
        net: item.net,
        window_start: item.window_start,
        window_end: item.window_end,
        status: item.status?.abbrev || "Go",
        status_name: item.status?.name || "Go for Launch",
        provider: item.launch_service_provider?.name || "Unknown Agency",
        rocket: item.rocket?.configuration?.name || "Unknown Rocket",
        pad: item.pad?.name || "Unknown Pad",
        location: item.pad?.location?.name || "Unknown Location",
        mission: item.mission?.description || "No mission details available.",
        image: item.image || null, // API provides 'image'
        webcast: item.vidURLs?.[0]?.url || null
    };
}
