"use client";

import { useState } from "react";
import SpotlightCard from "./SpotlightCard";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface NewsCardProps {
    news: {
        id: string;
        title: string;
        summary: string;
        imageUrl: string;
        source: string;
        publishedAt: string | Date; // Can be string from API or Date from DB/norm
        url: string;
    };
}

export default function NewsCard({ news }: NewsCardProps) {
    const [imgSrc, setImgSrc] = useState(news.imageUrl);

    const date = news.publishedAt instanceof Date ? news.publishedAt : new Date(news.publishedAt);

    return (
        <SpotlightCard className="h-full flex flex-col group p-0 border-white/10 bg-space-light/50 backdrop-blur-md">
            <div className="relative h-48 overflow-hidden w-full flex-shrink-0">
                <img
                    src={imgSrc || "/images/news-placeholder.jpg"}
                    alt={news.title}
                    onError={() => setImgSrc("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent" />
                <span className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600/80 text-xs rounded text-white font-medium backdrop-blur-sm">
                    {news.source}
                </span>
            </div>

            <div className="p-4 flex-1 flex flex-col relative z-10 w-full">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                        {news.title}
                    </a>
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                    {news.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-white/5 w-full">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(date, "MMM d, yyyy")}
                    </div>
                    <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </SpotlightCard>
    );
}
