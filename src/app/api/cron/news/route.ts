
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSpaceNews } from "@/lib/news";

export async function GET() {
    try {
        // 1. Fetch 50 items from external API
        const newsData = await getSpaceNews(50);

        if (!newsData || !newsData.results) {
            return NextResponse.json({ error: "Failed to fetch from external API" }, { status: 500 });
        }

        let addedCount = 0;

        // 2. Upsert into DB
        for (const article of newsData.results) {
            // Spaceflight News API usually gives an ID. Let's use it.
            const externalIdVal = `sfn-${article.id}`;

            await db.news.upsert({
                where: { externalId: externalIdVal },
                update: {
                    // Update fields if they change? Maybe just update text
                    title: article.title,
                    summary: article.summary,
                    imageUrl: article.image_url,
                    updatedAt: new Date(article.updated_at),
                },
                create: {
                    externalId: externalIdVal,
                    title: article.title,
                    summary: article.summary,
                    url: article.url,
                    imageUrl: article.image_url,
                    source: article.news_site,
                    publishedAt: new Date(article.published_at),
                    // "content" is optional or we can duplicate summary
                    content: article.summary,
                }
            });
            addedCount++;
        }

        return NextResponse.json({ success: true, count: addedCount, message: `Synced ${addedCount} articles.` });
    } catch (error) {
        console.error("News Sync Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
