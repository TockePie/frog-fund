import * as z from 'zod'

export const RaffleBodyObject = z.object({
  campaign_id: z.uuidv4(),
  description: z.string().min(10),
  raffle_date: z.date(),
  winner_count: z.number().min(1),
  raffle_type: z.enum(['ALL', 'MULTIPLE', 'TOP'])
})

//XXX: Who is the creator of the raffle?
export const RaffleObject = RaffleBodyObject.extend({
  id: z.uuidv4(),
  status: z.enum(['PENDING', 'COMPLETED'])
})

export const RafflesArray = z.array(RaffleObject)
