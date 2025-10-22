import prisma from './prisma.js'

export class UserService {
  async getUsers() {
    return await prisma.user.findMany()
  }
}
