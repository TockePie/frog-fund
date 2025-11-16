import prisma from '../utils/prisma.js'

export class CampaignService {
  async getCampaigns() {
    return await prisma.campaign.findMany()
  }

  async getCampaign(id) {
    return await prisma.campaign.findUnique({ where: { id } })
  }

  async createCampaign(data) {
    return await prisma.campaign.create({ data })
  }

  async updateCampaign(id, data) {
    return await prisma.campaign
      .update({
        where: { id },
        data
      })
      .catch(() => null)
  }

  async deleteCampaign(id) {
    return await prisma.campaign.delete({ where: { id } })
  }
}
