import { type TStepTools } from "./TStepTools";
import { type TWorkflowContext } from "./TWorkflowContext";

export interface INodeExecutorParams<TData = Record<string, unknown>> {
	data: TData;
	nodeId: string;
	context: TWorkflowContext;
	step: TStepTools;
	// publish: TODO add realtime later
}
