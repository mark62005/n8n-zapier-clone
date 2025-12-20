import { requireAuth } from "@/lib/utils/auth";

async function WorkflowsPage() {
	await requireAuth();

	return (
		<div>
			<div className=""></div>WorkflowsPage
		</div>
	);
}
export default WorkflowsPage;
