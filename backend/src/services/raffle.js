import prisma from './prisma.js'

export class RaffleService {
  async getAll() {
    return await prisma.raffle.findMany()
  }

  async getById(id) {
    return await prisma.raffle.findUnique({ where: { id } })
  }

  async create(data) {
    return await prisma.raffle.create({ data })
  }

  async update(id, data) {
    return await prisma.raffle.update({ where: { id }, data })
  }

  async delete(id) {
    return await prisma.raffle.delete({ where: { id } })
  }
}
