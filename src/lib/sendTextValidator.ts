import { z } from 'zod'

export const sendTextValidator = z.object({
    userId: z.string(),
    text: z.string()
})