import { type ICredentialsPageProps } from "@/types/app/page-props/dashboard/non-editor/credentials";

import { requireAuth } from "@/lib/utils/auth";
import { credentialsParamsLoader } from "@/lib/utils/credentials/params/params-loader";
import { prefetchCredentials } from "@/lib/utils/credentials/prefetch";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import CredentialsContainer from "@/components/dashboard/credentials/CredentialsContainer";
import CredentialList from "@/components/dashboard/credentials/CredentialList";
import CredentialsErrorView from "@/components/dashboard/credentials/CredentialsErrorView";
import CredentialsLoadingView from "@/components/dashboard/credentials/CredentialsLoadingView";

async function CredentialsPage({ searchParams }: ICredentialsPageProps) {
	await requireAuth();

	const params = await credentialsParamsLoader(searchParams);
	prefetchCredentials(params);

	return (
		<CredentialsContainer>
			<HydrateClient>
				<ErrorBoundary fallback={<CredentialsErrorView />}>
					<Suspense fallback={<CredentialsLoadingView />}>
						<CredentialList />
					</Suspense>
				</ErrorBoundary>
			</HydrateClient>
		</CredentialsContainer>
	);
}
export default CredentialsPage;
