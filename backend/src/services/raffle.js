import prisma from '../utils/prisma.js'

export class RaffleService {
  async getRaffles() {
    return await prisma.raffle.findMany()
  }

  async getRaffle(id) {
    return await prisma.raffle.findUnique({ where: { id } })
  }

  async createRaffle(data) {
    return await prisma.raffle.create({ data })
  }

  async deleteRaffle(id) {
    return await prisma.raffle.delete({ where: { id } })
  }
}
