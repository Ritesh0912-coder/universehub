import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getYouTubeThumbnail(url: string | null | undefined): string | null {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
        ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
        : null;
}

export function getValidImageUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const thumb = getYouTubeThumbnail(url);
        if (thumb) return thumb;
    }
    return url;
}
