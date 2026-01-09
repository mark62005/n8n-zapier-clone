import { requireAuth } from "@/lib/utils/auth";

import CredentialForm from "@/components/forms/dashboard/credentials/CredentialForm";

async function NewCredentialPage() {
	await requireAuth();

	return (
		<div className="h-full p-4 md:px-10 md:py-6">
			<div className="flex flex-col w-full max-w-3xl h-full mx-auto gap-y-8">
				<CredentialForm />
			</div>
		</div>
	);
}
export default NewCredentialPage;
