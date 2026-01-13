import { type IExecutionDetailsPageProps } from "@/types/app/page-props/dashboard/non-editor/executions";

import { requireAuth } from "@/lib/utils/auth";
import { prefetchExecutionById } from "@/lib/utils/executions/prefetch";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import ExecutionsErrorView from "@/components/dashboard/executions/ExecutionsErrorView";
import ExecutionsLoadingView from "@/components/dashboard/executions/ExecutionsLoadingView";
import ExecutionView from "@/components/dashboard/executions/ExecutionView";

async function ExecutionDetailsPage({ params }: IExecutionDetailsPageProps) {
	await requireAuth();

	const { executionId } = await params;
	prefetchExecutionById(executionId);

	return (
		<div className="h-full p-4 md:px-10 md:py-6">
			<div className="flex flex-col w-full max-w-3xl h-full mx-auto gap-y-8">
				<HydrateClient>
					<ErrorBoundary fallback={<ExecutionsErrorView />}>
						<Suspense fallback={<ExecutionsLoadingView />}>
							<ExecutionView executionId={executionId} />
						</Suspense>
					</ErrorBoundary>
				</HydrateClient>
			</div>
		</div>
	);
}
export default ExecutionDetailsPage;
