"use client";

import { type ICredentialViewProps } from "@/types/app/components/component-props/dashboard/credentials";

import { useSuspenseCredentialById } from "@/hooks/use-credentials";

import CredentialForm from "@/components/forms/dashboard/credentials/CredentialForm";

function CredentialView({ credentialId }: ICredentialViewProps) {
	const { data: credential } = useSuspenseCredentialById(credentialId);

	return <CredentialForm initialData={credential} />;
}
export default CredentialView;
