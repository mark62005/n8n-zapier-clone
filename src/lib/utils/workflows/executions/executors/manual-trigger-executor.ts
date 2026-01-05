import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

type TManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: TNodeExecutor<TManualTriggerData> = async ({
	nodeId,
	context,
	step,
}: INodeExecutorParams<TManualTriggerData>) => {
	// TODO: Publish "loading" state for manual trigger

	const result = await step.run("manual-trigger", async () => context);

	// TODO: Publish "success" state for manual trigger

	return result;
};
