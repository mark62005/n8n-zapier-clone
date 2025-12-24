import StateView from "../entities/StateView";

function WorkflowsErrorView() {
	return (
		<StateView
			variant="error"
			message="Error loading workflows."
		/>
	);
}
export default WorkflowsErrorView;
