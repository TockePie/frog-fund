import * as z from 'zod'

export const NotificationBodyObject = z.object({
  user_id: z.uuidv4(),
  message: z.string().min(1),
  status: z.enum(['PENDING', 'SENT'])
})

export const NotificationObject = NotificationBodyObject.extend({
  id: z.uuidv4()
})

export const NotificationsArray = z.array(NotificationObject)
