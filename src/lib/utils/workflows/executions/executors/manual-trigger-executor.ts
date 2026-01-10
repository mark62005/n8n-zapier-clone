import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";
import { createNodeStatusPublisher } from "@/inngest/utils";

type TManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: TNodeExecutor<TManualTriggerData> = async ({
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<TManualTriggerData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return manualTriggerChannel().status({
			nodeId,
			status,
		});
	});

	await publishStatus("loading");

	const result = await step.run("manual-trigger", async () => context);

	await publishStatus("success");

	return result;
};
