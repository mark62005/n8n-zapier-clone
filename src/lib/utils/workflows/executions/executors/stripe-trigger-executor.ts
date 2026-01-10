import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

import { stripeTriggerChannel } from "@/inngest/channels";
import { createNodeStatusPublisher } from "@/inngest/utils";

type TStripeTriggerData = Record<string, unknown>;

export const stripeTriggerExecutor: TNodeExecutor<TStripeTriggerData> = async ({
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<TStripeTriggerData>) => {
	const publishStatus = createNodeStatusPublisher(publish, (status) => {
		return stripeTriggerChannel().status({
			nodeId,
			status,
		});
	});

	await publishStatus("loading");

	const result = await step.run("stripe-trigger", async () => context);

	await publishStatus("success");

	return result;
};
