import { useQueryStates } from "nuqs";
import { workflowsParams } from "@/lib/utils/workflows/params/params";

export function useWorkflowsParams() {
	return useQueryStates(workflowsParams);
}
