import StateView from "../../entities/StateView";

function EditorErrorView() {
	return (
		<StateView
			variant="error"
			message="Error loading editor."
		/>
	);
}
export default EditorErrorView;
