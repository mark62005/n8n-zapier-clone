import { useQueryStates } from "nuqs";
import { credentialsParams } from "@/lib/utils/credentials/params";

export function useCredentialsParams() {
	return useQueryStates(credentialsParams);
}
