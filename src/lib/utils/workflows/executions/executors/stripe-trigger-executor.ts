import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

import { stripeTriggerChannel } from "@/inngest/channels";

type TStripeTriggerData = Record<string, unknown>;

export const stripeTriggerExecutor: TNodeExecutor<TStripeTriggerData> = async ({
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<TStripeTriggerData>) => {
	await publish(
		stripeTriggerChannel().status({
			nodeId,
			status: "loading",
		})
	);

	const result = await step.run("stripe-trigger", async () => context);

	await publish(
		stripeTriggerChannel().status({
			nodeId,
			status: "success",
		})
	);

	return result;
};
