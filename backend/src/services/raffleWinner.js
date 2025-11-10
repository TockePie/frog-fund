import prisma from './prisma.js'

export class RaffleWinnerService {
  async getAll() {
    return await prisma.raffleWinner.findMany()
  }

  async getById(id) {
    return await prisma.raffleWinner.findUnique({ where: { id } })
  }

  async create(data) {
    return await prisma.raffleWinner.create({ data })
  }

  async update(id, data) {
    return await prisma.raffleWinner.update({ where: { id }, data })
  }

  async delete(id) {
    return await prisma.raffleWinner.delete({ where: { id } })
  }
}
