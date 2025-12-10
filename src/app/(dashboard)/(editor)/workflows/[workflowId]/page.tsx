import { IWorkflowDetailsPageProps } from "@/types/app/page-props/dashboard/editor/WorkflowDetailsPageProps";

async function WorkflowDetailsPage({ params }: IWorkflowDetailsPageProps) {
	const { workflowId } = await params;

	return (
		<div>
			<div className="">Workflow ID: {workflowId}</div>
		</div>
	);
}
export default WorkflowDetailsPage;
