import { CredentialType } from "@/generated/prisma/enums";
import { PAGINATION } from "@/lib/constants/configs/dashboard/Pagination";

import z from "zod";
import prisma from "@/lib/db/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "..";
import { encrypt } from "@/lib/utils/credentials/encryption";

export const credentialsRouter = createTRPCRouter({
	/* GET CREDENTIAL OF A USER BY ID */
	getOneById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return await prisma.credential.findUniqueOrThrow({
				where: {
					id: input.id,
					userId: ctx.authSession.user.id,
				},
			});
		}),
	/* GET MULTIPLE CREDENTIALS OF A USER */
	getManyOfAUser: protectedProcedure
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

			const [credentials, totalNumberOfCredentialsOfAUser] = await Promise.all([
				prisma.credential.findMany({
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
				prisma.credential.count({
					where: {
						userId: ctx.authSession.user.id,
					},
				}),
			]);

			const totalNumberOfPages = Math.ceil(
				totalNumberOfCredentialsOfAUser / pageSize
			);
			const hasNextPage = page < totalNumberOfPages;
			const hasPreviousPage = page > 1;

			return {
				credentials,
				page,
				pageSize,
				totalNumberOfCredentialsOfAUser,
				totalNumberOfPages,
				hasNextPage,
				hasPreviousPage,
			};
		}),
	/* GET MULTIPLE CREDENTIALS OF A USER BY ITS TYPE */
	getManyByType: protectedProcedure
		.input(
			z.object({
				type: z.enum(CredentialType),
			})
		)
		.query(async ({ ctx, input }) => {
			return await prisma.credential.findMany({
				where: {
					type: input.type,
					userId: ctx.authSession.user.id,
				},
				orderBy: {
					updatedAt: "desc",
				},
			});
		}),
	/* CREATE A NEW CREDENTIAL */
	create: premiumProcedure
		.input(
			z.object({
				name: z.string().min(1, "Name is required."),
				type: z.enum(CredentialType),
				value: z.string().min(1, "Value is required."),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { name, value, type } = input;

			return await prisma.credential.create({
				data: {
					name,
					userId: ctx.authSession.user.id,
					type,
					value: encrypt(value),
				},
			});
		}),
	/* UPDATE A CREDENTIAL BY ITS ID*/
	updateById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Name is required."),
				type: z.enum(CredentialType),
				value: z.string().min(1, "Value is required."),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id, name, value, type } = input;

			return await prisma.credential.update({
				where: { id, userId: ctx.authSession.user.id },
				data: {
					name,
					type,
					value: encrypt(value),
				},
			});
		}),
	/* DELETE A CREDENTIAL BY ITS ID*/
	deleteById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return await prisma.credential.delete({
				where: {
					id: input.id,
					userId: ctx.authSession.user.id,
				},
			});
		}),
});
