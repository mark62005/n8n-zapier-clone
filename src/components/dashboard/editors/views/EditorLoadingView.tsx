import StateView from "../../entities/StateView";

function EditorLoadingView() {
	return (
		<StateView
			variant="loading"
			message="Loading editor..."
		/>
	);
}
export default EditorLoadingView;
