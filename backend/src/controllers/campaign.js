import {
  CampaignBodyObject,
  CampaignObject,
  CampaignsArray
} from '../models/campaign.js'
import { CampaignService } from '../services/campaign.js'

const campaignService = new CampaignService()

export async function getAllCampaigns(_req, res) {
  const items = await campaignService.getCampaigns()
  const response = CampaignsArray.parse(items)
  res.status(200).json(response)
}

export async function getCampaignById(req, res) {
  const { id } = req.params
  const item = await campaignService.getCampaign(id)
  if (!item) {
    const err = new Error('Campaign not found')
    err.status = 404
    throw err
  }
  const response = CampaignObject.parse(item)
  res.status(200).json(response)
}

export async function createCampaign(req, res) {
  const data = CampaignBodyObject.parse(req.body)
  const created = await campaignService.createCampaign(data)
  const response = CampaignObject.parse(created)
  res.status(201).json(response)
}

export async function updateCampaign(req, res) {
  const { id } = req.params
  const data = req.body
  const updated = await campaignService.updateCampaign(id, data)
  if (!updated) {
    const err = new Error('Campaign not found')
    err.status = 404
    throw err
  }
  const response = CampaignObject.parse(updated)
  res.status(200).json(response)
}

export async function deleteCampaign(req, res) {
  const { id } = req.params
  await campaignService.deleteCampaign(id)
  res.status(204).send()
}
