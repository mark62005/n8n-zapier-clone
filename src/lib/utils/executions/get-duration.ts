export function getDuration(
	startedAt: Date,
	completedAt: Date | null
): number | null {
	return completedAt
		? Math.round(
				(new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000
			)
		: null;
}
