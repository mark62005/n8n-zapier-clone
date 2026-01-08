"use client";

import { type ICredentialsHeaderProps } from "@/types/app/components/component-props/dashboard/credentials/credential-list/ICredentialsHeaderProps";

import EntityHeader from "../../entities/EntityHeader";

function CredentialsHeader({ disabled }: ICredentialsHeaderProps) {
	return (
		<EntityHeader
			title="Credentials"
			description="Create and manage your credentials"
			newButtonHref="/credentials/new"
			newButtonLabel="New Credential"
			disabled={disabled}
		/>
	);
}
export default CredentialsHeader;
