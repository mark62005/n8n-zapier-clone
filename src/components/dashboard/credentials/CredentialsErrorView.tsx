import StateView from "../entities/StateView";

function CredentialsErrorView() {
	return (
		<StateView
			variant="error"
			message="Error loading credentials."
		/>
	);
}
export default CredentialsErrorView;
