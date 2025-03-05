import { PrismaClient } from '@prisma/client'

const db = globalThis.prisma || new PrismaClient()

// eslint-disable-next-line no-var
declare global {
    var prisma: PrismaClient
}

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db
}

export default db;
