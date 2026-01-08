import { requireAuth } from "@/lib/utils/auth";
import { ICredentialDetailsPageProps } from "@/types/app/page-props/dashboard/non-editor/credentials";

async function CredentialDetailsPage({ params }: ICredentialDetailsPageProps) {
	await requireAuth();

	const { credentialId } = await params;

	return (
		<div>
			<div className="">Credential ID: {credentialId}</div>
		</div>
	);
}
export default CredentialDetailsPage;
