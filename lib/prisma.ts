// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // For Prisma 7, the config is loaded from prisma.config.ts automatically
  // No need to pass url here
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma