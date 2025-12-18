
import { PrismaClient } from '@prisma/client'
import { getCompulsoryImage } from '../src/lib/utils'

const prisma = new PrismaClient()

async function main() {
    const news = await prisma.news.findMany()

    console.log(`Checking ${news.length} articles...`)
    let fixedCount = 0

    for (const n of news) {
        if (n.imageUrl && (n.imageUrl.includes('google') || n.imageUrl.includes('gstatic'))) {
            console.log(`Cleaning: ${n.title}`)
            const newImage = getCompulsoryImage(null, n.title + " " + n.summary)

            await prisma.news.update({
                where: { id: n.id },
                data: { imageUrl: newImage }
            })
            fixedCount++
        }
    }

    console.log(`--- Clean Up Complete ---`)
    console.log(`Fixed: ${fixedCount} articles`)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
