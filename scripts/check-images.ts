
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const news = await prisma.news.findMany({
        select: {
            title: true,
            imageUrl: true,
            source: true
        }
    })

    console.log("--- News Image Audit ---")
    news.forEach(n => {
        console.log(`[${n.source}] ${n.title.substring(0, 40)}...`)
        console.log(`URL: ${n.imageUrl}`)
        if (n.imageUrl && (n.imageUrl.includes('google') || n.imageUrl.includes('gstatic'))) {
            console.log(">> WARNING: Google/Gstatic URL detected in DB!")
        }
        console.log('---')
    })
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
