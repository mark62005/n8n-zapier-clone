"use client";

import {
	useSuspenseCredentialsOfAUser,
	useCredentialsParams,
} from "@/hooks/use-credentials";

import EntityPagination from "../../entities/EntityPagination";

function CredentialsPagination() {
	const credentials = useSuspenseCredentialsOfAUser();
	const [params, setParams] = useCredentialsParams();

	function handlePageChange(page: number) {
		setParams({ ...params, page });
	}

	return (
		<EntityPagination
			page={credentials.data.page}
			totalNumberOfPages={credentials.data.totalNumberOfPages}
			onPageChange={handlePageChange}
			disabled={credentials.isFetching}
		/>
	);
}
export default CredentialsPagination;
