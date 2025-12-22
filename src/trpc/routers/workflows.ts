import z from "zod";
import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db/db";
import { createTRPCRouter, protectedProcedure } from "..";

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
	getAllWorkflowsOfAUser: protectedProcedure.query(({ ctx }) => {
		return prisma.workflow.findMany({
			where: {
				userId: ctx.authSession.user.id,
			},
		});
	}),
	/* CREATE A NEW WORKFLOW */
	createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
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
