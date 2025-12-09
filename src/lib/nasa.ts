export const NASA_API_BASE = "https://api.nasa.gov";
export const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

export async function getAPOD() {
    try {
        const res = await fetch(`${NASA_API_BASE}/planetary/apod?api_key=${API_KEY}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });
        if (!res.ok) throw new Error("Failed to fetch APOD");
        return res.json();
    } catch (error) {
        console.error("APOD Error:", error);
        return null;
    }
}

export async function getNeoWS() {
    // Implementation for asteroids if needed later
    return null;
}
