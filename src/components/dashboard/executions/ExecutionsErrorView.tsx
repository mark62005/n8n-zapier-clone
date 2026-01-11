import StateView from "../entities/StateView";

function ExecutionsErrorView() {
	return (
		<StateView
			variant="error"
			message="Error loading executions."
		/>
	);
}
export default ExecutionsErrorView;
