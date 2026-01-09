import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IOpenAiNodeData } from "@/types/app/workflows/nodes";

import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import prisma from "@/lib/db/db";
import { openAiChannel } from "@/inngest/channels";

Handlebars.registerHelper("json", (context) => {
	try {
		const jsonString = JSON.stringify(context, null, 2);
		const safeString = new Handlebars.SafeString(jsonString);

		return safeString;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new Error(`Failed to serialize context to JSON: ${errorMessage}`);
	}
});

export const openAiExecutor: TNodeExecutor<IOpenAiNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<IOpenAiNodeData>) => {
	await publish(
		openAiChannel().status({
			nodeId,
			status: "loading",
		})
	);

	// Runtime validations
	if (!data.variableName) {
		await publish(
			openAiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError(
			"Variable name not configured from OpenAI node."
		);
	}

	if (!data.userPrompt) {
		await publish(
			openAiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError("User prompt not configured from OpenAI node.");
	}

	if (!data.credentialId) {
		await publish(
			openAiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError("Credential ID is missing from OpenAI node.");
	}

	// Syntax templating
	const systemPrompt = data.systemPrompt
		? Handlebars.compile(data.systemPrompt)(context)
		: "You are a helpful assistant.";

	// Parse previous workflow data for syntax templating
	let userPrompt: string;
	try {
		const template = Handlebars.compile(data.userPrompt);
		userPrompt = template(context);

		if (!userPrompt) {
			throw new Error(
				"User prompt template must resolve to a non-empty string."
			);
		}
	} catch (error) {
		await publish(
			openAiChannel().status({
				nodeId,
				status: "error",
			})
		);

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new NonRetriableError(
			`Failed to resolve user prompt template from OpenAI node: ${errorMessage}`
		);
	}

	// Fetch credential
	const credential = await step.run("fetch-credential", async () => {
		return await prisma.credential.findUnique({
			where: {
				id: data.credentialId,
			},
		});
	});

	if (!credential) {
		await publish(
			openAiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError("OpenAI node: Credential not found.");
	}

	const openAi = createOpenAI({
		apiKey: credential.value,
	});

	try {
		const { steps } = await step.ai.wrap("openai-generate-text", generateText, {
			model: openAi("gpt-4"),
			system: systemPrompt,
			prompt: userPrompt,
			experimental_telemetry: {
				isEnabled: true,
				recordInputs: true,
				recordOutputs: true,
			},
		});

		const text =
			steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

		await publish(
			openAiChannel().status({
				nodeId,
				status: "success",
			})
		);

		return {
			...context,
			[data.variableName]: {
				aiResponse: text,
			},
		};
	} catch (error) {
		await publish(
			openAiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw error;
	}
};
