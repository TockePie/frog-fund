import prisma from '../utils/prisma.js'

export class RaffleWinnerService {
  async getRaffleWinners() {
    return await prisma.raffleWinner.findMany()
  }

  async getRaffleWinner(id) {
    return await prisma.raffleWinner.findUnique({ where: { id } })
  }

  async createRaffleWinner(data) {
    return await prisma.raffleWinner.create({ data })
  }

  async deleteRaffleWinner(id) {
    return await prisma.raffleWinner.delete({ where: { id } })
  }
}
