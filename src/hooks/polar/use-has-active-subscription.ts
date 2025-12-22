import { useSubscription } from "./use-subscription";

export function useHasActiveSubscription() {
	const { data: customerState, isLoading, ...rest } = useSubscription();

	const activeSubscriptions = customerState?.activeSubscriptions;

	const hasActiveSubcription =
		activeSubscriptions && activeSubscriptions?.length > 0;

	return {
		hasActiveSubcription,
		subscription: activeSubscriptions?.[0],
		isLoading,
		...rest,
	};
}
