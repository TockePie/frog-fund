import prisma from '../utils/prisma.js'

export class DonationService {
  static async getDonations() {
    return await prisma.donation.findMany({ include: { user: true } })
  }

  static async getDonation(id) {
    return await prisma.donation.findUnique({
      where: { id },
      include: { user: true }
    })
  }

  static async createDonation(data) {
    return await prisma.donation.create({ data })
  }

  static async deleteDonation(id) {
    return await prisma.donation.delete({ where: { id } })
  }
}
