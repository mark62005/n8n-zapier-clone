import { INodeExecutorParams } from "./INodeExecutorParams";
import { TWorkflowContext } from "./TWorkflowContext";

export type TNodeExecutor<TData = TWorkflowContext> = (
	params: INodeExecutorParams<TData>
) => Promise<TWorkflowContext>;
