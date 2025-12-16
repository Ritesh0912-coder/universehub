import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";
import InfiniteMenu from "@/components/ui/InfiniteMenu";
import { getRecentAPODs } from "@/lib/nasa";

export const revalidate = 3600; // Revalidate every hour

const FALLBACK_IMAGES = [
    { image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", link: "https://unsplash.com/photos/earth", title: "Earth", description: "Our blue marble." },
    { image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop", link: "https://unsplash.com/photos/orbit", title: "Orbit", description: "Curvature of Earth." },
    { image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop", link: "https://unsplash.com/photos/nebula", title: "Nebula", description: "Deep space wonders." },
    { image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop", link: "https://unsplash.com/photos/cosmos", title: "Cosmos", description: "Infinite starlight." },
    { image: "https://images.unsplash.com/photo-1454789548728-85d2696cf667?q=80&w=2060&auto=format&fit=crop", link: "https://unsplash.com/photos/astronaut", title: "Astronaut", description: "Humanity in space." },
    { image: "https://images.unsplash.com/photo-1614730341194-75c60740a087?q=80&w=2148&auto=format&fit=crop", link: "https://unsplash.com/photos/spacex", title: "Launch", description: "Future of travel." },
    { image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=2074&auto=format&fit=crop", link: "https://unsplash.com/photos/nebula", title: "Galaxy", description: "Spiral beauty." },
    { image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop", link: "https://unsplash.com/photos/rocket", title: "Rocket", description: "To the stars." },
];

export default async function GalleryPage() {
    // Fetch recent APODs (last 30 days)
    const apodData = await getRecentAPODs(30);

    // Filter and map APOD data
    const dynamicImages = Array.isArray(apodData)
        ? apodData
            .filter((item: any) => item.media_type === "image" && item.url)
            .map((item: any) => {
                const imageUrl = item.hdurl || item.url;
                const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}&w=800&q=80`;
                return {
                    image: proxyUrl,
                    link: imageUrl, // Link to original
                    title: item.title,
                    description: item.explanation ? item.explanation.substring(0, 600) + (item.explanation.length > 600 ? "..." : "") : "NASA Astronomy Picture of the Day"
                };
            })
        : [];

    // Combine with fallback if dynamic list is short (to ensure infinite scroll works smoothly)
    // Preference: Use ONLY dynamic if we have enough (e.g., > 10). If < 10, mix in fallbacks.
    const galleryItems = dynamicImages.length >= 10
        ? dynamicImages
        : [...dynamicImages, ...FALLBACK_IMAGES];

    // Remove potential duplicates by image URL (just in case)
    const uniqueItems = Array.from(new Map(galleryItems.map((item: any) => [item.image, item])).values());

    return (
        <main className="min-h-screen bg-black overflow-hidden relative">

            {/* Background elements if needed */}
            <div className="absolute inset-0 bg-transparent pointer-events-none z-0"></div>

            <div className="absolute top-24 left-0 right-0 z-10 text-center pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 opacity-80">
                    Cosmic Gallery
                </h1>
                <p className="text-gray-400 mt-2 font-mono text-sm opacity-60">
                    Daily Imagery from the Cosmos
                </p>
            </div>

            <div className="w-full h-screen relative z-0">
                <InfiniteMenu items={uniqueItems} />
            </div>

        </main>
    );
}
