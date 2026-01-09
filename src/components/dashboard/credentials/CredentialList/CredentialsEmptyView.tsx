"use client";

import { useRouter } from "next/navigation";

import EmptyView from "../../entities/EmptyView";

function CredentialsEmptyView() {
	const router = useRouter();

	function handleCreateClick() {
		router.push(`/credentials/new`);
	}

	return (
		<EmptyView
			variant="empty"
			titleLabel="No credentials"
			message="You haven't created any credentials yet. Get started by creating your first credential."
			onNew={handleCreateClick}
			addNewButtonLabel="Create credential"
		/>
	);
}
export default CredentialsEmptyView;
