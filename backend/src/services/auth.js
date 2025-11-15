import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { HttpError } from '../utils/http-error.js'
import prisma from './prisma.js'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'

export class AuthService {
  async signUp({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d'
    })

    return { token }
  }

  async logIn({ email, password }) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) throw new HttpError('User not found', 404)

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new HttpError('Invalid password', 401)

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d'
    })

    return { token }
  }
}
