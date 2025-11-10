import prisma from './prisma.js'

export class DonationService {
  async getAll() {
    return await prisma.donation.findMany()
  }

  async getById(id) {
    return await prisma.donation.findUnique({ where: { id } })
  }

  async create(data) {
    return await prisma.donation.create({ data })
  }

  async update(id, data) {
    return await prisma.donation.update({ where: { id }, data })
  }

  async delete(id) {
    return await prisma.donation.delete({ where: { id } })
  }
}
