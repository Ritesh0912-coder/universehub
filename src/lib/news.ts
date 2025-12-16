import { db } from "./db";
import { getValidImageUrl } from "./utils";

export const NEWS_API_BASE = "https://api.spaceflightnewsapi.net/v4";

// Fetch from External API
export async function getSpaceNews(limit = 10, offset = 0) {
    try {
        const res = await fetch(`${NEWS_API_BASE}/articles?limit=${limit}&offset=${offset}`, {
            cache: 'no-store', // Ensure fresh data every request
        });
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();

        // Sanitize images
        data.results = data.results.map((article: any) => ({
            ...article,
            image_url: getValidImageUrl(article.image_url) || article.image_url
        }));

        return data;
    } catch (error) {
        console.error("News API Error:", error);
        return { results: [], count: 0, next: null, previous: null };
    }
}

// Fetch from Database (Archive)
export async function getArchivedNews(limit = 50) {
    try {
        const news = await db.news.findMany({
            take: limit,
            orderBy: { publishedAt: 'desc' },
        });
        // Map to same format as API for compatibility
        return {
            results: news.map(n => ({
                id: n.id, // Internal DB ID
                title: n.title,
                url: n.url,
                image_url: n.imageUrl,
                news_site: n.source,
                summary: n.summary,
                published_at: n.publishedAt.toISOString(),
            }))
        };
    } catch (error) {
        console.error("DB News Error:", error);
        return { results: [] };
    }
}

// Sync function to be called if DB is empty or by cron
export async function syncSpaceNews() {
    console.log("Syncing news...");
    const data = await getSpaceNews(50);
    if (data && data.results) {
        for (const article of data.results) {
            const externalIdVal = `sfn-${article.id}`;
            await db.news.upsert({
                where: { externalId: externalIdVal },
                update: { updatedAt: new Date() },
                create: {
                    externalId: externalIdVal,
                    title: article.title,
                    summary: article.summary,
                    url: article.url,
                    imageUrl: article.image_url,
                    source: article.news_site,
                    publishedAt: new Date(article.published_at),
                    content: article.summary,
                }
            });
        }
    }
}
