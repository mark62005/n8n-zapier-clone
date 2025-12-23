import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { requireAuth } from "@/lib/utils/auth";
import { prefetchWorkflows } from "@/lib/utils/workflows/prefetch";
import { HydrateClient } from "@/trpc/server";
import WorkflowList from "@/components/dashboard/workflows/WorkflowList";
import WorkflowsContainer from "@/components/dashboard/workflows/WorkflowList/WorkflowsContainer";

async function WorkflowsPage() {
	await requireAuth();

	prefetchWorkflows();

	return (
		<WorkflowsContainer>
			<HydrateClient>
				<ErrorBoundary fallback={<p>Error fetching workflows.</p>}>
					<Suspense fallback={<p>Loading...</p>}>
						<WorkflowList />
					</Suspense>
				</ErrorBoundary>
			</HydrateClient>
		</WorkflowsContainer>
	);
}
export default WorkflowsPage;
