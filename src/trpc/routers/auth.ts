import prisma from "@/lib/db/db";
import { createTRPCRouter, protectedProcedure } from "../index";

export const authRouter = createTRPCRouter({
	getAuthUser: protectedProcedure.query(({ ctx }) => {
		return prisma.user.findUnique({
			where: {
				id: ctx.authSession.user.id,
			},
		});
	}),
});
