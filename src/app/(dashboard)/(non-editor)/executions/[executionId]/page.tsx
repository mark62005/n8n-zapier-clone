import { IExecutionDetailsPageProps } from "@/types/app/page-props/dashboard/non-editor/IExecutionDetailsPageProps";
import { requireAuth } from "@/lib/utils/auth";

async function ExecutionDetailsPage({ params }: IExecutionDetailsPageProps) {
	await requireAuth();

	const { executionId } = await params;

	return (
		<div>
			<div className="">Execution ID: {executionId}</div>
		</div>
	);
}
export default ExecutionDetailsPage;
