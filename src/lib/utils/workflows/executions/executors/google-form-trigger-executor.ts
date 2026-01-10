import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";
import { createNodeStatusPublisher } from "@/inngest/utils";

type TGoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: TNodeExecutor<
	TGoogleFormTriggerData
> = async ({
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<TGoogleFormTriggerData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return googleFormTriggerChannel().status({
			nodeId,
			status,
		});
	});

	await publishStatus("loading");

	const result = await step.run("google-form-trigger", async () => context);

	await publishStatus("success");

	return result;
};
