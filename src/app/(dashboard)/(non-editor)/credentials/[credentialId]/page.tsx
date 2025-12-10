import { ICredentialDetailsPageProps } from "@/types/app/page-props/dashboard/non-editor/CredentialDetailsPageProps";

async function CredentialDetailsPage({ params }: ICredentialDetailsPageProps) {
	const { credentialId } = await params;

	return (
		<div>
			<div className="">Credential ID: {credentialId}</div>
		</div>
	);
}
export default CredentialDetailsPage;
