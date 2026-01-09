import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IAnthropicNodeData } from "@/types/app/workflows/nodes";

import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import prisma from "@/lib/db/db";
import { anthropicChannel } from "@/inngest/channels";

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

export const anthropicExecutor: TNodeExecutor<IAnthropicNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<IAnthropicNodeData>) => {
	await publish(
		anthropicChannel().status({
			nodeId,
			status: "loading",
		})
	);

	// Runtime validations
	if (!data.variableName) {
		await publish(
			anthropicChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError(
			"Variable name not configured from Anthropic node."
		);
	}

	if (!data.userPrompt) {
		await publish(
			anthropicChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError(
			"User prompt not configured from Anthropic node."
		);
	}

	if (!data.credentialId) {
		await publish(
			anthropicChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError(
			"Credential ID is missing from Anthropic node."
		);
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
			anthropicChannel().status({
				nodeId,
				status: "error",
			})
		);

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new NonRetriableError(
			`Failed to resolve user prompt template from Anthropic node: ${errorMessage}`
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
			anthropicChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError("Anthropic node: Credential not found.");
	}

	const anthropic = createAnthropic({
		apiKey: credential.value,
	});

	try {
		const { steps } = await step.ai.wrap(
			"anthropic-generate-text",
			generateText,
			{
				model: anthropic("claude-opus-4-0"),
				system: systemPrompt,
				prompt: userPrompt,
				experimental_telemetry: {
					isEnabled: true,
					recordInputs: true,
					recordOutputs: true,
				},
			}
		);

		const text =
			steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

		await publish(
			anthropicChannel().status({
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
			anthropicChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw error;
	}
};
