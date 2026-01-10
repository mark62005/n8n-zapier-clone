import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IGeminiNodeData } from "@/types/app/workflows/nodes";

import { CredentialType } from "@/generated/prisma/enums";
import { STEP_GET_REQUIRED_CREDENTIAL } from "@/inngest/constants/steps";

import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { geminiChannel } from "@/inngest/channels";
import { createNodeStatusPublisher } from "@/inngest/utils";
import { getRequiredCredential } from "@/lib/utils/credentials/get-required-credentials";
import { getCredentialTypeNameOrThrow } from "@/lib/utils/credentials/type-name-registry";

export const geminiExecutor: TNodeExecutor<IGeminiNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<IGeminiNodeData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return geminiChannel().status({ nodeId, status });
	});

	await publishStatus("loading");

	const nodeName = getCredentialTypeNameOrThrow(CredentialType.GEMINI);

	// Runtime validations
	if (!data.variableName) {
		await publishStatus("error");

		throw new NonRetriableError(
			`Variable name not configured from ${nodeName} node.`
		);
	}

	if (!data.userPrompt) {
		await publishStatus("error");

		throw new NonRetriableError(
			`User prompt not configured from ${nodeName} node.`
		);
	}

	if (!data.credentialId) {
		await publishStatus("error");

		throw new NonRetriableError(
			`Credential ID is missing from ${nodeName} node.`
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
			await publishStatus("error");

			throw new Error(
				"User prompt template must resolve to a non-empty string."
			);
		}
	} catch (error) {
		await publishStatus("error");

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new NonRetriableError(
			`Failed to resolve user prompt template from ${nodeName} node: ${errorMessage}`
		);
	}

	// Fetch credential
	let credential;
	try {
		credential = await step.run(STEP_GET_REQUIRED_CREDENTIAL, async () => {
			return await getRequiredCredential(
				data.credentialId ?? "",
				CredentialType.GEMINI
			);
		});
	} catch (error) {
		await publishStatus("error");

		throw error;
	}

	const geminiAi = createGoogleGenerativeAI({
		apiKey: credential.value,
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

		await publishStatus("success");

		return {
			...context,
			[data.variableName]: {
				aiResponse: text,
			},
		};
	} catch (error) {
		await publishStatus("error");

		throw error;
	}
};
