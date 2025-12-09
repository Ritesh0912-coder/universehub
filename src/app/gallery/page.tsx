import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

const galleryImages = [
    { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", title: "Earth from Space", desc: "A view of our blue marble." },
    { src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop", title: "Orbit", desc: "The curvature of the Earth." },
    { src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop", title: "Nebula", desc: "Deep space wonders." },
    { src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop", title: "Cosmos", desc: "The infinite starlight." },
    { src: "https://images.unsplash.com/photo-1454789548728-85d2696cf667?q=80&w=2060&auto=format&fit=crop", title: "Astronaut", desc: "Humanity in space." },
    { src: "https://images.unsplash.com/photo-1614730341194-75c60740a087?q=80&w=2148&auto=format&fit=crop", title: "SpaceX Launch", desc: "The future of travel." },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                    Cosmic Gallery
                </h1>
                <p className="text-gray-400 text-lg">
                    Witness the breathtaking beauty of our universe.
                </p>
            </div>

            <div className="masonry-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, idx) => (
                    <GlassCard key={idx} className="overflow-hidden group cursor-pointer relative min-h-[300px]">
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="font-orbitron font-bold text-white text-xl">{img.title}</h3>
                            <p className="text-gray-300 text-sm">{img.desc}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </main>
    );
}
