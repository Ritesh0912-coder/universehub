import { getYouTubeThumbnail } from "./utils";

export const SPACEX_API_BASE = "https://api.spacexdata.com/v5";

export async function getUpcomingLaunches() {
    try {
        const res = await fetch(`${SPACEX_API_BASE}/launches/upcoming`, {
            next: { revalidate: 600 }, // 10 minutes
        });
        if (!res.ok) throw new Error("Failed to fetch launches");
        const data = await res.json();

        // Transform data to ensure image property exists
        const processedData = data.map((launch: any) => {
            let image = null;
            // 1. Flickr
            if (launch.links?.flickr?.original?.length > 0) {
                image = launch.links.flickr.original[0];
            }
            // 2. Patch
            else if (launch.links?.patch?.large) {
                image = launch.links.patch.large;
            }
            // 3. YouTube (common for upcoming streams)
            else if (launch.links?.webcast || launch.links?.youtube_id) {
                const ytUrl = launch.links.webcast || `https://www.youtube.com/watch?v=${launch.links.youtube_id}`;
                image = getYouTubeThumbnail(ytUrl);
            }

            return { ...launch, image };
        });

        // Sort by date_unix
        return processedData.sort((a: any, b: any) => a.date_unix - b.date_unix);
    } catch (error) {
        console.error("SpaceX Error:", error);
        return [];
    }
}

export async function getPastLaunches() {
    try {
        const res = await fetch(`${SPACEX_API_BASE}/launches/past`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error("Failed to fetch past launches");
        const data = await res.json();
        return data.sort((a: any, b: any) => b.date_unix - a.date_unix).slice(0, 20); // Last 20
    } catch (error) {
        return [];
    }
}
