import prisma from '../utils/prisma.js'

export class DonationService {
  async getDonations() {
    return await prisma.donation.findMany()
  }

  async getDonation(id) {
    return await prisma.donation.findUnique({ where: { id } })
  }

  async createDonation(data) {
    return await prisma.donation.create({ data })
  }

  async deleteDonation(id) {
    return await prisma.donation.delete({ where: { id } })
  }
}
