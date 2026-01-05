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

	const result = await step.run("http-request", async () => {
		const method = data.method!;
		const endpoint = data.endpoint!;

		const options: TKyOptions = { method };

		if (["POST", "PUT", "PATCH"].includes(method)) {
			if (data.body) {
				// TODO: Parse the json body from http request node
				options.body = data.body;
			}
		}

		const response = await ky(endpoint, options);
		const contentType = response.headers.get("content-type");

		// TODO: Return multiple json data if needed
		const responseData = contentType?.includes("application/json")
			? await response.json()
			: await response.text();

		const httpResponse = {
			status: response.status,
			statusText: response.statusText,
			data: responseData,
		};

		return {
			...context,
			httpResponse,
		};
	});

	// TODO: Publish "success" state for http request

	return result;
};
