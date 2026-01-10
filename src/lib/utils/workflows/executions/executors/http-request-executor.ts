import { type Options as TKyOptions } from "ky";
import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IHttpRequestNodeData } from "@/types/app/workflows/nodes/IHttpRequestNodeData";

import ky from "ky";
import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { httpRequestChannel } from "@/inngest/channels";
import { createNodeStatusPublisher } from "@/inngest/utils";

export const httpRequestExecutor: TNodeExecutor<IHttpRequestNodeData> = async ({
	data,
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<IHttpRequestNodeData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return httpRequestChannel().status({
			nodeId,
			status,
		});
	});

	await publishStatus("loading");

	try {
		const result = await step.run("http-request", async () => {
			// Runtime validation
			if (!data.method) {
				await publishStatus("error");

				throw new NonRetriableError(
					"Method not configured from HTTP Request node."
				);
			}

			if (!data.endpoint) {
				await publishStatus("error");

				throw new NonRetriableError(
					"Endpoint not configured from HTTP Request node."
				);
			}

			if (!data.variableName) {
				await publishStatus("error");

				throw new NonRetriableError(
					"Variable name not configured from HTTP Request node."
				);
			}

			const method = data.method;

			// Parse previous workflow data for syntax templating
			let endpoint: string;
			try {
				const template = Handlebars.compile(data.endpoint);
				endpoint = template(context);

				if (!endpoint) {
					await publishStatus("error");

					throw new Error(
						"Endpoint template must resolve to a non-empty string."
					);
				}
			} catch (error) {
				await publishStatus("loading");

				const errorMessage =
					error instanceof Error ? error.message : String(error);
				throw new NonRetriableError(
					`Failed to resolve endpoint template from HTTP Request node: ${errorMessage}`
				);
			}

			const options: TKyOptions = { method };

			if (["POST", "PUT", "PATCH"].includes(method)) {
				let resolvedBody: string;
				try {
					const bodyTemplate = Handlebars.compile(data.body || "{}");
					resolvedBody = bodyTemplate(context);
				} catch (error) {
					await publishStatus("loading");

					const errorMessage =
						error instanceof Error ? error.message : String(error);
					throw new NonRetriableError(
						`Failed to template request body from HTTP Request node: ${errorMessage}`
					);
				}

				try {
					JSON.parse(resolvedBody);
				} catch (error) {
					await publishStatus("loading");

					const errorMessage =
						error instanceof Error ? error.message : String(error);
					throw new NonRetriableError(
						`Request body is not valid JSON after templating from HTTP Request node: ${errorMessage}`
					);
				}

				options.body = resolvedBody;
				options.headers = {
					"Content-Type": "application/json",
				};
			}

			const response = await ky(endpoint, options);
			const contentType = response.headers.get("content-type");

			const responseData = contentType?.includes("application/json")
				? await response.json()
				: await response.text();

			const responsePayload = {
				httpResponse: {
					status: response.status,
					statusText: response.statusText,
					data: responseData,
				},
			};

			return {
				...context,
				[data.variableName]: responsePayload,
			};
		});

		await publishStatus("success");

		return result;
	} catch (error) {
		await publishStatus("error");

		throw error;
	}
};
