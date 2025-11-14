import * as z from 'zod'

export const RaffleWinnerBodyObject = z.object({
  raffle_id: z.uuidv4()
})

export const RaffleWinnerObject = RaffleWinnerBodyObject.extend({
  id: z.uuidv4()
})

export const RaffleWinnersArray = z.array(RaffleWinnerObject)
