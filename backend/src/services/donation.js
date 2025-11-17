import prisma from '../utils/prisma.js'

export class DonationService {
  static async getDonations() {
    return await prisma.donation.findMany()
  }

  static async getDonation(id) {
    return await prisma.donation.findUnique({ where: { id } })
  }

  static async createDonation(data) {
    return await prisma.donation.create({ data })
  }

  static async deleteDonation(id) {
    return await prisma.donation.delete({ where: { id } })
  }
}
