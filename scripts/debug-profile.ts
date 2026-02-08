
import 'dotenv/config'
import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaClient as PrismaClientKb } from '../lib/generated/kerjaberkah-prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const connectionStringKb = process.env.DATABASE_URL_KERJABERKAH
const poolKb = new pg.Pool({ connectionString: connectionStringKb })
const adapterKb = new PrismaPg(poolKb)
const kerjaBerkahPrisma = new PrismaClientKb({ adapter: adapterKb })

async function main() {
    const email = 'xabivuzu@mailinator.com'
    console.log(`Checking user with email: ${email}`)

    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set')
        return
    }

    const user = await prisma.users.findUnique({
        where: { email },
    })

    if (!user) {
        console.log('User not found in main DB')
        return
    }

    const userId = user.id
    console.log(`Looking for workers with user_id: ${userId}`)

    const workers = await kerjaBerkahPrisma.workers.findMany({
        where: { user_id: userId },
    })

    console.log(`Found ${workers.length} worker profile(s) for user_id ${userId}`)

    workers.forEach((w, index) => {
        const workerLog = JSON.parse(JSON.stringify(w, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ))
        console.log(`Worker #${index + 1}:`, workerLog)
    })

    if (workers.length === 0) {
        console.log('No worker profile found.')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await kerjaBerkahPrisma.$disconnect()
    })
