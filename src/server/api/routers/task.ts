import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.create({
        data: {
          title: input.title,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
});
