
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
    const userId = 13 // From log
    console.log(`Checking user with ID: ${userId}`)

    const user = await prisma.users.findUnique({
        where: { id: BigInt(userId) },
    })

    if (!user) {
        console.log('User not found in main DB')
        return
    }

    // Convert BigInt to string for logging
    const userLog = JSON.parse(JSON.stringify(user, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))
    console.log('User found in main DB:', userLog)

    const company = await kerjaBerkahPrisma.companies.findFirst({
        where: { user_id: BigInt(userId) },
    })

    if (!company) {
        console.log('Company profile NOT found in KerjaBerkah DB')
    } else {
        const companyLog = JSON.parse(JSON.stringify(company, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ))
        console.log('Company profile found in KerjaBerkah DB:', companyLog)
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
