import { type Options as TKyOptions } from "ky";
import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";
import { type IHttpRequestNodeData } from "@/types/app/workflows/nodes/IHttpRequestNodeData";

import ky from "ky";
import { NonRetriableError } from "inngest";

export const httpRequestExecutor: TNodeExecutor<IHttpRequestNodeData> = async ({
	data,
	nodeId,
	context,
	step,
}: INodeExecutorParams<IHttpRequestNodeData>) => {
	// TODO: Publish "loading" state for http request

	if (!data.method) {
		// TODO: Publish "error" state for http request
		throw new NonRetriableError(
			"Method not configured from HTTP Request node."
		);
	}

	if (!data.endpoint) {
		// TODO: Publish "error" state for http request
		throw new NonRetriableError(
			"Endpoint not configured from HTTP Request node."
		);
	}

	if (!data.variableName) {
		// TODO: Publish "error" state for http request
		throw new NonRetriableError(
			"Variable name not configured from HTTP Request node."
		);
	}

	const result = await step.run("http-request", async () => {
		const method = data.method!;
		const endpoint = data.endpoint!;

		const options: TKyOptions = { method };

		if (["POST", "PUT", "PATCH"].includes(method)) {
			if (data.body) {
				// TODO: Parse the json body from http request node
				options.body = data.body;
				options.headers = {
					"Content-Type": "application/json",
				};
			}
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

		if (data.variableName) {
			return {
				...context,
				[data.variableName]: responsePayload,
			};
		}

		// Fallback to direct httpResponse for backward compatibility
		return {
			...context,
			...responsePayload,
		};
	});

	// TODO: Publish "success" state for http request

	return result;
};
