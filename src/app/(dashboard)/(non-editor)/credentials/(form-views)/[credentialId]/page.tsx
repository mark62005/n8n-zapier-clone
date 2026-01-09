import { type ICredentialDetailsPageProps } from "@/types/app/page-props/dashboard/non-editor/credentials";

import { requireAuth } from "@/lib/utils/auth";
import { prefetchCredentialById } from "@/lib/utils/credentials/prefetch";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import CredentialsErrorView from "@/components/dashboard/credentials/CredentialsErrorView";
import CredentialsLoadingView from "@/components/dashboard/credentials/CredentialsLoadingView";
import CredentialView from "@/components/dashboard/credentials/CredentialView";

async function CredentialDetailsPage({ params }: ICredentialDetailsPageProps) {
	await requireAuth();

	const { credentialId } = await params;
	prefetchCredentialById(credentialId);

	return (
		<HydrateClient>
			<ErrorBoundary fallback={<CredentialsErrorView />}>
				<Suspense fallback={<CredentialsLoadingView />}>
					<CredentialView credentialId={credentialId} />
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	);
}
export default CredentialDetailsPage;
