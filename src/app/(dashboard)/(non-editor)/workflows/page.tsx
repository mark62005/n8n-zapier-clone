import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { requireAuth } from "@/lib/utils/auth";
import { prefetchWorkflows } from "@/lib/utils/workflows/prefetch";
import { HydrateClient } from "@/trpc/server";
import WorkflowList from "@/components/dashboard/workflows/WorkflowList";
import WorkflowsContainer from "@/components/dashboard/workflows/WorkflowList/WorkflowsContainer";
import { IWorkflowsPageProps } from "@/types/app/page-props/dashboard/non-editor/workflows/IWorkflowsPageProps";
import { workflowsParamsLoader } from "@/lib/utils/workflows/params/params-loader";
import WorkflowsErrorView from "@/components/dashboard/workflows/WorkflowsErrorView";
import WorkflowsLoadingView from "@/components/dashboard/workflows/WorkflowsLoadingView";

async function WorkflowsPage({ searchParams }: IWorkflowsPageProps) {
	await requireAuth();

	const params = await workflowsParamsLoader(searchParams);
	prefetchWorkflows(params);

	return (
		<WorkflowsContainer>
			<HydrateClient>
				<ErrorBoundary fallback={<WorkflowsErrorView />}>
					<Suspense fallback={<WorkflowsLoadingView />}>
						<WorkflowList />
					</Suspense>
				</ErrorBoundary>
			</HydrateClient>
		</WorkflowsContainer>
	);
}
export default WorkflowsPage;
