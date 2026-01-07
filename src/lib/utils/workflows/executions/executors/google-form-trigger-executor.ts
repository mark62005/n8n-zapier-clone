import {
	type INodeExecutorParams,
	type TNodeExecutor,
} from "@/types/app/workflows/executions/executors";

import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

type TGoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: TNodeExecutor<
	TGoogleFormTriggerData
> = async ({
	nodeId,
	context,
	step,
	publish,
}: INodeExecutorParams<TGoogleFormTriggerData>) => {
	await publish(
		googleFormTriggerChannel().status({
			nodeId,
			status: "loading",
		})
	);

	const result = await step.run("google-form-trigger", async () => context);

	await publish(
		googleFormTriggerChannel().status({
			nodeId,
			status: "success",
		})
	);

	return result;
};
