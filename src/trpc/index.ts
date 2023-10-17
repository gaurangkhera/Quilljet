import {
    privateProcedure,
    publicProcedure,
    router
} from './trpc'
import { TRPCError } from '@trpc/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from '@/db'
import { z } from 'zod'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true}
  }),

  getUserPrevTexts: privateProcedure.query(async ({ ctx }) => {
    //@ts-ignore
    const { userId } = ctx

    const msgs = await db.message.findMany({
      where: {
        userId,
      },
    })

    return msgs
  }),

  deleteText: privateProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ctx, input}) => {
    //@ts-ignore
    const { userId } = ctx

    const msg = await db.message.findFirst({
      where: {
        id: input.id,
        userId
      }
    })

    if(!msg) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    await db.message.delete({
      where: {
        id: input.id,
      }
    })

    return msg
  }),
})