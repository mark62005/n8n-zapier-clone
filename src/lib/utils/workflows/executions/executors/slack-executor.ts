import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type ISlackNodeData } from "@/types/app/workflows/nodes";

import Handlebars from "handlebars";
import ky from "ky";
import { NonRetriableError } from "inngest";
import { decode } from "html-entities";
import { slackChannel } from "@/inngest/channels";
import { createNodeStatusPublisher } from "@/inngest/utils";

export const slackExecutor: TNodeExecutor<ISlackNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<ISlackNodeData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return slackChannel().status({ nodeId, status });
	});

	await publishStatus("loading");

	// Runtime validations
	if (!data.content) {
		await publishStatus("error");

		throw new NonRetriableError(`Message content is missing from Slack node.`);
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
			`Failed to resolve message content template from Slack node: ${errorMessage}`
		);
	}
	const decodedContent = decode(content);

	try {
		return await step.run("send-slack-message", async () => {
			// Runtime validations
			if (!data.variableName) {
				await publishStatus("error");

				throw new NonRetriableError(
					`Variable name not configured from Slack node.`
				);
			}

			if (!data.webhookUrl) {
				await publishStatus("error");

				throw new NonRetriableError(
					`Webhook URL not configured from Slack node.`
				);
			}

			await ky.post(data.webhookUrl, {
				json: {
					content: decodedContent,
				},
			});

			await publishStatus("success");

			return {
				...context,
				[data.variableName]: {
					messageContent: decodedContent.slice(0, 2000),
				},
			};
		});
	} catch (error) {
		await publishStatus("error");
		throw error;
	}
};
