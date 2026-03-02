import prisma from '../generated/prisma/index.js' // 👈 ШЛЯХ МОЖЕ ВІДРІЗНЯТИСЬ!
import { UserBodyObject } from '../models/user.js'
import { AuthService } from '../services/auth.js'
// якщо в тебе вже є десь готовий prisma-інстанс (наприклад ../prisma.js),
// підключи саме його.

export async function logIn(req, res) {
  const result = await AuthService.logIn(req.body)
  res.status(200).json(result)
}

export async function signUp(req, res) {
  const body = UserBodyObject.parse(req.body)
  const result = await AuthService.signUp(body)
  res.status(201).json(result)
}

/**
 * Повертає поточного юзера (кабінет):
 * - береться req.user.id з JWT (middleware)
 * - тягнемо юзера та його банки з БД
 */
export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      campaigns: true // 👈 тут має бути назва звʼязку з Prisma (дивись schema.prisma)
    }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    balance: user.balance,
    campaigns: user.campaigns
  })
}
