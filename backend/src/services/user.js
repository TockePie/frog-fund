import prisma from '../utils/prisma.js'

export class UserService {
  static async getUsers() {
    return await prisma.user.findMany()
  }

  static async getUser(id) {
    return await prisma.user.findUnique({ where: { id } })
  }

  static async createUser(data) {
    return await prisma.user.create({ data })
  }

  static async updateUserData(id, data) {
    return await prisma.user.update({
      where: { id },
      data
    })
  }

  static async deleteUser(id) {
    return await prisma.user.delete({ where: { id } })
  }
}
