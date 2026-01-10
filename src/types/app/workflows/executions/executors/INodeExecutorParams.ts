import { type Realtime } from "@inngest/realtime";
import { type TStepTools } from "./TStepTools";
import { type TWorkflowContext } from "./TWorkflowContext";

export interface INodeExecutorParams<TData = Record<string, unknown>> {
	data: TData;
	nodeId: string;
	userId: string;
	context: TWorkflowContext;
	step: TStepTools;
	publish: Realtime.PublishFn;
}
