import {
  CampaignBodyObject,
  CampaignObject,
  CampaignsArray,
  CampaignUpdateObject
} from '../models/campaign.js'
import { CampaignService } from '../services/campaign.js'
import { HttpError } from '../utils/http-error.js'

export async function getAllCampaigns(_req, res) {
  const items = await CampaignService.getCampaigns()
  const response = CampaignsArray.parse(items)
  res.status(200).json(response)
}
export async function getCampaignById(req, res) {
  const { id } = req.params

  const item = await CampaignService.getCampaign(id)
  if (!item) throw new HttpError('Campaign not found', 404)

  res.status(200).json(
    CampaignObject.parse({
      ...item,
      currentUserId: req.user.id
    })
  )
}

export async function createCampaign(req, res) {
  const body = CampaignBodyObject.parse(req.body)

  if (!req.user?.id) throw new HttpError('Unauthorized', 401)

  const created = await CampaignService.createCampaign({
    ...body,
    organizer_id: req.user.id,
    collected_amount: 0,
    status: 'DRAFT'
  })

  res.status(201).json(CampaignObject.parse(created))
}

export async function updateCampaign(req, res) {
  const { id } = req.params
  const data = CampaignUpdateObject.parse(req.body)

  const existing = await CampaignService.getCampaign(id)
  if (!existing) throw new HttpError('Campaign not found', 404)

  if (existing.organizer_id !== req.user.id)
    throw new HttpError('Forbidden', 403)

  const updated = await CampaignService.updateCampaign(id, data)

  res.status(200).json(CampaignObject.parse(updated))
}

export async function deleteCampaign(req, res) {
  const { id } = req.params

  const existing = await CampaignService.getCampaign(id)
  if (!existing) throw new HttpError('Campaign not found', 404)

  if (existing.organizer_id !== req.user.id)
    throw new HttpError('Forbidden', 403)

  await CampaignService.deleteCampaign(id)
  res.status(204).send()
}
