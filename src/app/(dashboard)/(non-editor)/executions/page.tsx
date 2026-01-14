import { type IExecutionsPageProps } from "@/types/app/page-props/dashboard/non-editor/executions";

import { requireAuth } from "@/lib/utils/auth";
import { executionsParamsLoader } from "@/lib/utils/executions/params/params-loader";
import { prefetchExecutions } from "@/lib/utils/executions/prefetch";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import ExecutionsContainer from "@/components/dashboard/executions/ExecutionsContainer";
import ExecutionList from "@/components/dashboard/executions/ExecutionList";
import ExecutionsErrorView from "@/components/dashboard/executions/ExecutionsErrorView";
import ExecutionsLoadingView from "@/components/dashboard/executions/ExecutionsLoadingView";

async function ExecutionsPage({ searchParams }: IExecutionsPageProps) {
	await requireAuth();

	const params = await executionsParamsLoader(searchParams);
	prefetchExecutions(params);

	return (
		<ExecutionsContainer>
			<HydrateClient>
				<ErrorBoundary fallback={<ExecutionsErrorView />}>
					<Suspense fallback={<ExecutionsLoadingView />}>
						<ExecutionList />
					</Suspense>
				</ErrorBoundary>
			</HydrateClient>
		</ExecutionsContainer>
	);
}
export default ExecutionsPage;
