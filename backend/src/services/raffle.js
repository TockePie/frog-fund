import prisma from '../utils/prisma.js'

export class RaffleService {
  static async getRaffles() {
    return await prisma.raffle.findMany()
  }

  static async getRaffle(id) {
    return await prisma.raffle.findUnique({ where: { id } })
  }

  static async createRaffle(data) {
    return await prisma.raffle.create({ data })
  }

  static async deleteRaffle(id) {
    return await prisma.raffle.delete({ where: { id } })
  }
}
