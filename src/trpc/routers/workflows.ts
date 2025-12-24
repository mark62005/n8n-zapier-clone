import z from "zod";
import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "..";
import { PAGINATION } from "@/lib/constants/configs/dashboard/Pagination";

export const workflowsRouter = createTRPCRouter({
	/* GET ALL WORKFLOWS */
	getAllWorkflows: protectedProcedure.query(() => {
		return prisma.workflow.findMany();
	}),
	/* GET WORKFLOW OF A USER BY ID */
	getWorkflowOfAUserById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return prisma.workflow.findUnique({
				where: {
					id: input.id,
					userId: ctx.authSession.user.id,
				},
			});
		}),
	/* GET ALL WORKFLOWS OF A USER */
	getAllWorkflowsOfAUser: protectedProcedure
		.input(
			z.object({
				page: z.number().default(PAGINATION.DEFAULT_PAGE),
				pageSize: z
					.number()
					.min(PAGINATION.MIN_PAGE_SIZE)
					.max(PAGINATION.MAX_PAGE_SIZE)
					.default(PAGINATION.DEFAULT_PAGE_SIZE),
				searchQuery: z.string().default(""),
			})
		)
		.query(async ({ ctx, input }) => {
			const { page, pageSize, searchQuery } = input;

			const [workflows, totalNumberOfWorkflowsOfAUser] = await Promise.all([
				prisma.workflow.findMany({
					skip: (page - 1) * pageSize,
					take: pageSize,
					where: {
						userId: ctx.authSession.user.id,
						name: {
							contains: searchQuery,
							mode: "insensitive",
						},
					},
					orderBy: {
						updatedAt: "desc",
					},
				}),
				prisma.workflow.count({
					where: {
						userId: ctx.authSession.user.id,
					},
				}),
			]);

			const totalNumberOfPages = Math.ceil(
				totalNumberOfWorkflowsOfAUser / pageSize
			);
			const hasNextPage = page < totalNumberOfPages;
			const hasPreviousPage = page > 1;

			return {
				workflows,
				page,
				pageSize,
				totalNumberOfWorkflowsOfAUser,
				totalNumberOfPages,
				hasNextPage,
				hasPreviousPage,
			};
		}),
	/* CREATE A NEW WORKFLOW */
	createWorkflow: premiumProcedure.mutation(async ({ ctx }) => {
		return await prisma.workflow.create({
			data: {
				name: generateSlug(3),
				userId: ctx.authSession.user.id,
			},
		});
	}),
	/* DELETE A SPECIFIC WORKFLOW */
	deleteWorkflow: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return await prisma.workflow.delete({
				where: {
					id: input.id,
					userId: ctx.authSession.user.id,
				},
			});
		}),
	/* UPDATE THE NAME OF A SPECIFIC WORKFLOW */
	updateWorkflowName: protectedProcedure
		.input(z.object({ id: z.string(), name: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
			return await prisma.workflow.update({
				where: {
					id: input.id,
					userId: ctx.authSession.user.id,
				},
				data: {
					name: input.name,
				},
			});
		}),
});
