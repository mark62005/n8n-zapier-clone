import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IGeminiNodeData } from "@/types/app/workflows/nodes";

import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { geminiChannel } from "@/inngest/channels";

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

export const geminiExecutor: TNodeExecutor<IGeminiNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<IGeminiNodeData>) => {
	await publish(
		geminiChannel().status({
			nodeId,
			status: "loading",
		})
	);

	// Runtime validation
	if (!data.variableName) {
		await publish(
			geminiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError(
			"Variable name not configured from Gemini node."
		);
	}
	if (!data.userPrompt) {
		await publish(
			geminiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw new NonRetriableError("User prompt not configured from Gemini node.");
	}

	// TODO: Throw error if credentials is missing

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
			geminiChannel().status({
				nodeId,
				status: "error",
			})
		);

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new NonRetriableError(
			`Failed to resolve user prompt template from Gemini node: ${errorMessage}`
		);
	}

	// TODO: Fetch credentials that user selected
	const credentialValue = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

	const geminiAi = createGoogleGenerativeAI({
		apiKey: credentialValue,
	});

	try {
		const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
			model: geminiAi("gemini-2.5-flash"),
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
			geminiChannel().status({
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
			geminiChannel().status({
				nodeId,
				status: "error",
			})
		);

		throw error;
	}
};
