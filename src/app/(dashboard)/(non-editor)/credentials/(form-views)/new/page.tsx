import { requireAuth } from "@/lib/utils/auth";

import CredentialForm from "@/components/forms/dashboard/credentials/CredentialForm";

async function NewCredentialPage() {
	await requireAuth();

	return <CredentialForm />;
}
export default NewCredentialPage;
