import prisma from '../utils/prisma.js'

export class UserService {
  async getUsers() {
    return await prisma.user.findMany()
  }

  async getUser(id) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async createUser(data) {
    return await prisma.user.create({ data })
  }

  async updateUser(id, data) {
    return await prisma.user
      .update({
        where: { id },
        data
      })
      .catch(() => null)
  }

  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } })
  }
}
