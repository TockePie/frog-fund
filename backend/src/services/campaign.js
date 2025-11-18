import prisma from '../utils/prisma.js'

export class CampaignService {
  static async getCampaigns() {
    return await prisma.campaign.findMany()
  }

  static async getCampaign(id) {
    return await prisma.campaign.findUnique({ where: { id } })
  }

  static async createCampaign(data) {
    return await prisma.campaign.create({ data })
  }

  static async updateCampaign(id, data) {
    return await prisma.campaign
      .update({
        where: { id },
        data
      })
      .catch(() => null)
  }

  static async deleteCampaign(id) {
    return await prisma.campaign.delete({ where: { id } })
  }
}
