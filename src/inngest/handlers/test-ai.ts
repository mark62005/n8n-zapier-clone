import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { inngest } from "../client";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openAi = createOpenAI();
const anthropicAi = createAnthropic();

export const executeAi = inngest.createFunction(
	{ id: "execute-ai" },
	{ event: "test/execute.ai" },
	async ({ step }) => {
		await step.sleep("pretend", "5s");

		const { steps: geminiSteps } = await step.ai.wrap(
			"gemini-generate-text",
			generateText,
			{
				model: google("gemini-2.5-flash"),
				system: "You are a helpful assistant.",
				prompt: "What is 2 + 2?",
			}
		);

		const { steps: openAiSteps } = await step.ai.wrap(
			"gemini-generate-text",
			generateText,
			{
				model: openAi("gpt-4"),
				system: "You are a helpful assistant.",
				prompt: "What is 2 + 2?",
			}
		);

		const { steps: anthropicSteps } = await step.ai.wrap(
			"gemini-generate-text",
			generateText,
			{
				model: anthropicAi("claude-sonnet-4-0"),
				system: "You are a helpful assistant.",
				prompt: "What is 2 + 2?",
			}
		);

		return {
			geminiSteps,
			openAiSteps,
			anthropicSteps,
		};
	}
);
