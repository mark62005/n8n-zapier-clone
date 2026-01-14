"use client";

import { useRouter } from "next/navigation";

import EmptyView from "../../entities/EmptyView";

function ExecutionsEmptyView() {
	return (
		<EmptyView
			variant="empty"
			titleLabel="No executions"
			message="You don't have any execution history yet. Get started by running your first workflow."
		/>
	);
}
export default ExecutionsEmptyView;
