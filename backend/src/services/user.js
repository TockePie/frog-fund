import prisma from './prisma.js'

export class UserService {
  async getUsers() {
    return await prisma.user.findMany()
  }

  async createUser(data) {
    return await prisma.user.create({ data })
  }
}
