import jwt from 'jsonwebtoken'

import prisma from '../prisma.js'

export async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('No token')

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 🔥 ВАЖЛИВО: включаємо Campaign[]
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        Campaign: true // ← ось через це банки з'являться у профілі!
      }
    })

    if (!user) throw new Error('User not found')

    req.user = user
    next()
  } catch (err) {
    console.error('AUTH ERROR:', err)
    res.status(401).json({ message: 'Unauthorized' })
  }
}
