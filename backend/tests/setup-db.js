import bcrypt from 'bcryptjs'

import prisma from '../src/prisma.js'

const TEST_USER_ID = '00000000-0000-0000-0000-000000000001'
const CAMPAIGN_ID = 'campaign-1'

/**
 * Виконуємо видалення всіх даних у правильному порядку (дочірні записи першими),
 * потім створюємо мінімальні seed-дані:
 * - тестового користувача з ID = TEST_USER_ID
 * - кампанію з id = 'campaign-1', organizer_id = TEST_USER_ID
 *
 * Ми використовуємо beforeAll, щоб не чистити БД між кожним it() — тестові сценарії
 * у деяких файлах спираються на послідовність (signup -> login).
 */
beforeAll(async () => {
  // Видаляємо дочірні таблиці спочатку
  await prisma.raffleWinner.deleteMany().catch(() => {})
  await prisma.notification.deleteMany().catch(() => {})
  await prisma.donation.deleteMany().catch(() => {})
  await prisma.raffle.deleteMany().catch(() => {})
  await prisma.campaign.deleteMany().catch(() => {})
  await prisma.user.deleteMany().catch(() => {})

  // Додаємо тестового користувача
  const hashed = await bcrypt.hash('password', 10)
  await prisma.user.create({
    data: {
      id: TEST_USER_ID,
      name: 'Test User',
      email: 'test@example.com',
      password: hashed,
      balance: 1000
    }
  })

  // Додаємо тестову кампанію (щоб tests використовували '/campaigns/campaign-1/donate')
  await prisma.campaign.create({
    data: {
      id: CAMPAIGN_ID,
      organizer_id: TEST_USER_ID,
      title: 'Seed Campaign',
      description: 'Seeded campaign for tests',
      target_amount: 1000,
      collected_amount: 0,
      status: 'ACTIVE'
    }
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
