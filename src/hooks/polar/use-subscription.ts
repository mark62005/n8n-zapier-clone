import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth/auth-client";

export function useSubscription() {
	return useQuery({
		queryKey: ["subscription"],
		queryFn: async () => {
			const { data } = await authClient.customer.state();

			return data;
		},
	});
}
