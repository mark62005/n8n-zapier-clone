import { useQueryStates } from "nuqs";
import { executionsParams } from "@/lib/utils/executions/params";

export function useExecutionsParams() {
	return useQueryStates(executionsParams);
}
