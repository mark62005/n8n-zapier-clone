import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

type TManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: TNodeExecutor<TManualTriggerData> = async ({
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<TManualTriggerData>) => {
	await publish(
		manualTriggerChannel().status({
			nodeId,
			status: "loading",
		})
	);

	const result = await step.run("manual-trigger", async () => context);

	await publish(
		manualTriggerChannel().status({
			nodeId,
			status: "success",
		})
	);

	return result;
};
