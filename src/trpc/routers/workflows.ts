import prisma from "@/lib/db/db";
import { createTRPCRouter, protectedProcedure } from "..";

export const workflowsRouter = createTRPCRouter({
	getAllWorkflows: protectedProcedure.query(() => {
		return prisma.workflow.findMany();
	}),
	createWorkflow: protectedProcedure.mutation(async () => {
		// Fetch video
		await new Promise((resolve) => setTimeout(resolve, 5_000));

		// Transcribe video
		await new Promise((resolve) => setTimeout(resolve, 5_000));

		// Send the transcription to OpenAI
		await new Promise((resolve) => setTimeout(resolve, 5_000));

		return prisma.workflow.create({
			data: {
				name: "test-workflow",
			},
		});
	}),
});
