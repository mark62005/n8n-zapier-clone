import { Suspense } from "react";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/utils/auth";
import { prefetchWorkflowById } from "@/lib/utils/workflows/prefetch";
import { IWorkflowDetailsPageProps } from "@/types/app/page-props/dashboard/editor/WorkflowDetailsPageProps";
import { ErrorBoundary } from "react-error-boundary";
import EditorErrorView from "@/components/dashboard/editors/views/EditorErrorView";
import EditorLoadingView from "@/components/dashboard/editors/views/EditorLoadingView";
import EditorHeader from "@/components/dashboard/editors/EditorHeader";
import Editor from "@/components/dashboard/editors/Editor";

async function WorkflowDetailsPage({ params }: IWorkflowDetailsPageProps) {
	await requireAuth();

	const { workflowId } = await params;
	prefetchWorkflowById(workflowId);

	return (
		<HydrateClient>
			<ErrorBoundary fallback={<EditorErrorView />}>
				<Suspense fallback={<EditorLoadingView />}>
					<EditorHeader workflowId={workflowId} />

					<main className="flex-1">
						<Editor workflowId={workflowId} />
					</main>
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	);
}
export default WorkflowDetailsPage;
