import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IDiscordNodeData } from "@/types/app/workflows/nodes";

import Handlebars from "handlebars";
import ky from "ky";
import { NonRetriableError } from "inngest";
import { decode } from "html-entities";
import { discordChannel } from "@/inngest/channels";
import { createNodeStatusPublisher } from "@/inngest/utils";

export const discordExecutor: TNodeExecutor<IDiscordNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<IDiscordNodeData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return discordChannel().status({ nodeId, status });
	});

	await publishStatus("loading");

	// Runtime validations
	if (!data.content) {
		await publishStatus("error");

		throw new NonRetriableError(
			`Message content is missing from Discord node.`
		);
	}

	// Parse previous workflow data for syntax templating
	let content: string;
	try {
		const template = Handlebars.compile(data.content);
		content = template(context);

		if (!content) {
			await publishStatus("error");

			throw new Error(
				"Message content template must resolve to a non-empty string."
			);
		}
	} catch (error) {
		await publishStatus("error");

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new NonRetriableError(
			`Failed to resolve message content template from Discord node: ${errorMessage}`
		);
	}

	const decodedContent = decode(content);

	// Username
	let username: string | undefined;
	try {
		if (data.username) {
			const template = Handlebars.compile(data.username);
			username = template(context);

			if (!username) {
				await publishStatus("error");

				throw new Error(
					"Username template must resolve to a non-empty string."
				);
			}

			username = decode(username);
		}
	} catch (error) {
		await publishStatus("error");

		const errorMessage = error instanceof Error ? error.message : String(error);
		throw new NonRetriableError(
			`Failed to resolve message username template from Discord node: ${errorMessage}`
		);
	}

	try {
		return await step.run("send-discord-message", async () => {
			const slicedContent = decodedContent.slice(0, 2000);

			// Runtime validations
			if (!data.variableName) {
				await publishStatus("error");

				throw new NonRetriableError(
					`Variable name not configured from Discord node.`
				);
			}

			if (!data.webhookUrl) {
				await publishStatus("error");

				throw new NonRetriableError(
					`Webhook URL not configured from Discord node.`
				);
			}

			await ky.post(data.webhookUrl, {
				json: {
					content: slicedContent,
					username,
				},
			});

			await publishStatus("success");

			return {
				...context,
				[data.variableName]: {
					messageContent: slicedContent,
				},
			};
		});
	} catch (error) {
		await publishStatus("error");
		throw error;
	}
};
