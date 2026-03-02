import * as z from 'zod'

export const UserObject = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string()
})

export const CampaignBodyObject = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  target_amount: z.number().optional()
})

export const CampaignObject = CampaignBodyObject.extend({
  id: z.string(),
  organizer_id: z.string(),
  collected_amount: z.number(),
  status: z.enum(['DRAFT', 'ACTIVE', 'CLOSED', 'ARCHIVE']),

  // ⭐ ДОДАНІ ПОЛЯ:
  user: UserObject.optional(),
  currentUserId: z.string().optional()
})

export const CampaignUpdateObject = CampaignBodyObject.partial()

export const CampaignsArray = z.array(CampaignObject)
