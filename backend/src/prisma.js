import { PrismaClient as ProdPrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'test') {
  console.log('🧪 Using TEST SQLite Prisma client')
  // Помістимо динамічний імпорт — він працює в ESM
  const mod = await import('./generated/test-client/index.js')
  const TestPrisma = mod.PrismaClient ?? mod.PrismaClient
  prisma = new TestPrisma()
} else {
  prisma = new ProdPrismaClient()
}

export default prisma
