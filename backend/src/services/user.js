import prisma from '../utils/prisma.js'

export class UserService {
  static async getUsers() {
    return await prisma.user.findMany()
  }

  static async createUser(data) {
    return await prisma.user.create({ data })
  }

  static async updateUsersData(id, data) {
    return await prisma.user.update({
      where: { id },
      data
    })
  }
}
