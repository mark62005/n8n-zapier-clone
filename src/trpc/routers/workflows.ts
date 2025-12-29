import z from "zod";
import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "..";
import { PAGINATION } from "@/lib/constants/configs/dashboard/Pagination";
import type { Node as TNode, Edge as TEdge } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/enums";

export const workflowsRouter = createTRPCRouter({
	/* GET ALL WORKFLOWS */
	getAllWorkflows: protectedProcedure.query(() => {
		return prisma.workflow.findMany();
	}),
	/* GET WORKFLOW OF A USER BY ID */
	getWorkflowOfAUserById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const workflow = await prisma.workflow.findUniqueOrThrow({
				where: {
					id: input.id,
					userId: ctx.authSession.user.id,
				},
				include: {
					nodes: true,
					connections: true,
				},
			});

			// Transform nodes from database to react-flow compatible nodes
			const nodes: TNode[] = workflow.nodes.map((node) => ({
				id: node.id,
				type: node.type,
				position: node.position as { x: number; y: number },
				data: (node.data as Record<string, unknown>) || {},
			}));

			// Transform connections from database to react-flow compatible edges
			const edges: TEdge[] = workflow.connections.map((connection) => ({
				id: connection.id,
				source: connection.fromNodeId,
				target: connection.toNodeId,
				sourceHandle: connection.fromOutput,
				targetHandle: connection.toInput,
			}));

			return {
				id: workflow.id,
				name: workflow.name,
				nodes,
				edges,
			};
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
				nodes: {
					create: {
						type: NodeType.INITIAL,
						position: { x: 0, y: 0 },
						name: NodeType.INITIAL,
					},
				},
			},
			include: {
				nodes: true,
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
