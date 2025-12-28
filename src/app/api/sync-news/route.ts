import { NextResponse } from "next/server";
import { syncSpaceNews } from "@/lib/news";

// Prevent static generation - this is a dynamic API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        console.log("Manual sync triggered via API...");
        await syncSpaceNews();
        return NextResponse.json({
            success: true,
            message: "News sync completed successfully. ISRO news should now be visible."
        });
    } catch (error: any) {
        console.error("Sync error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
