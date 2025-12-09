export async function getISSPosition() {
    try {
        const res = await fetch("http://api.open-notify.org/iss-now.json", {
            cache: "no-store", // Real-time
        });
        if (!res.ok) throw new Error("Failed to fetch ISS position");
        return res.json();
    } catch (error) {
        console.error("ISS API Error:", error);
        return { iss_position: { latitude: "0", longitude: "0" } };
    }
}
