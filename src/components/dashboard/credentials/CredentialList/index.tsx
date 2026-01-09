"use client";

import { useSuspenseCredentialsOfAUser } from "@/hooks/use-credentials";

import CredentialsEmptyView from "./CredentialsEmptyView";
import EntityList from "../../entities/EntityList";
import CredentialItem from "./CredentialItem";

function CredentialList() {
	const credentials = useSuspenseCredentialsOfAUser();

	return (
		<EntityList
			items={credentials.data.credentials}
			getKey={(credential) => credential.id}
			renderItem={(credential) => <CredentialItem data={credential} />}
			emptyView={<CredentialsEmptyView />}
		/>
	);
}
export default CredentialList;
