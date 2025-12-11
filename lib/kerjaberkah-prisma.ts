import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../lib/generated/kerjaberkah-prisma/client'

const connectionString = `${process.env.DATABASE_URL_KERJABERKAH}`

const adapter = new PrismaPg({ connectionString })
const kerjaBerkahPrisma = new PrismaClient({ adapter })

export { kerjaBerkahPrisma }