import * as z from 'zod'

export const CampaignBodyObject = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  target_amount: z.number().optional()
})

export const CampaignObject = CampaignBodyObject.extend({
  id: z.uuidv4(),
  organizer_id: z.uuidv4(),
  collected_amount: z.number(),
  status: z.enum(['DRAFT', 'ACTIVE', 'CLOSED', 'ARCHIVE'])
})

export const CampaignUpdateObject = CampaignBodyObject.partial()
export const CampaignsArray = z.array(CampaignObject)
