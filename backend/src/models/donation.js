import * as z from 'zod'

export const DonationBodyObject = z.object({
  campaign_id: z.uuidv4(),
  amount: z.number().min(0.01),
  comment: z.string().optional()
})

export const DonationObject = DonationBodyObject.extend({
  id: z.uuidv4(),
  donor_id: z.uuidv4(),
  transaction_id: z.uuidv4()
})

export const DonationsArray = z.array(DonationObject)
