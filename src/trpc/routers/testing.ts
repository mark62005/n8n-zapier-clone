import { z } from "zod";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "../index";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db/db";

export const testingRouter = createTRPCRouter({
	hello: baseProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),
	testAi: protectedProcedure.mutation(async () => {
		// const { text: geminiText } = await generateText({
		// 	model: google("gemini-2.5-flash"),
		// 	prompt: "Write a vegetarian lasagna recipe for 4 people.",
		// });

		await inngest.send({
			name: "test/execute.ai",
		});

		return { success: true, message: "AI Job queued." };
	}),
	testWorkflow: protectedProcedure.mutation(async () => {
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

export type TestingRouter = typeof testingRouter;
