import prisma from '../prisma.js'

export class CampaignService {
  // ============================
  // GET ALL CAMPAIGNS
  // ============================
  static async getCampaigns() {
    return await prisma.campaign.findMany({
      include: {
        user: true // ← додано!
      }
    })
  }

  // ============================
  // GET CAMPAIGN BY ID
  // ============================
  static async getCampaign(id) {
    return await prisma.campaign.findUnique({
      where: { id },
      include: {
        user: true // ← додано!
      }
    })
  }

  // ============================
  // CREATE CAMPAIGN
  // ============================
  static async createCampaign(data) {
    return await prisma.campaign.create({
      data,
      include: {
        user: true // ← повертаємо організатора одразу
      }
    })
  }

  // ============================
  // UPDATE CAMPAIGN
  // ============================
  static async updateCampaign(id, data) {
    return await prisma.campaign
      .update({
        where: { id },
        data,
        include: {
          user: true // ← теж повертаємо ім’я
        }
      })
      .catch(() => null)
  }

  // ============================
  // DELETE CAMPAIGN
  // ============================
  static async deleteCampaign(id) {
    return await prisma.campaign.delete({
      where: { id }
    })
  }
}
