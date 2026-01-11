import { PAGINATION } from "@/lib/constants/configs/dashboard/Pagination";

import z from "zod";
import prisma from "@/lib/db/db";
import { createTRPCRouter, protectedProcedure } from "..";

export const executionsRouter = createTRPCRouter({
	/* GET EXECUTION HISTORY OF A WORKFLOW BY ID */
	getOneById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return await prisma.execution.findUniqueOrThrow({
				where: {
					id: input.id,
					workflow: { userId: ctx.authSession.user.id },
				},
			});
		}),
	/* GET MULTIPLE EXECUTION HISTORY OF A WORKFLOW */
	getManyOfAWorkflow: protectedProcedure
		.input(
			z.object({
				page: z.number().default(PAGINATION.DEFAULT_PAGE),
				pageSize: z
					.number()
					.min(PAGINATION.MIN_PAGE_SIZE)
					.max(PAGINATION.MAX_PAGE_SIZE)
					.default(PAGINATION.DEFAULT_PAGE_SIZE),
			})
		)
		.query(async ({ ctx, input }) => {
			const { page, pageSize } = input;

			const [executions, totalNumberOfExecutionsOfAUser] = await Promise.all([
				prisma.execution.findMany({
					skip: (page - 1) * pageSize,
					take: pageSize,
					where: {
						workflow: { userId: ctx.authSession.user.id },
					},
					orderBy: {
						startedAt: "desc",
					},
					include: {
						workflow: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				}),
				prisma.execution.count({
					where: {
						workflow: { userId: ctx.authSession.user.id },
					},
				}),
			]);

			const totalNumberOfPages = Math.ceil(
				totalNumberOfExecutionsOfAUser / pageSize
			);
			const hasNextPage = page < totalNumberOfPages;
			const hasPreviousPage = page > 1;

			return {
				executions,
				page,
				pageSize,
				totalNumberOfExecutionsOfAUser,
				totalNumberOfPages,
				hasNextPage,
				hasPreviousPage,
			};
		}),
});
