"use client";

import { type IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";

import EntityContainer from "../entities/EntityContainer";
import CredentialsHeader from "./CredentialList/CredentialsHeader";
import CredentialsSearch from "./CredentialList/CredentialsSearch";
import CredentialsPagination from "./CredentialList/CredentialsPagination";

function CredentialsContainer({ children }: IGeneralLayoutProps) {
	return (
		<EntityContainer
			header={<CredentialsHeader />}
			search={<CredentialsSearch />}
			pagination={<CredentialsPagination />}
		>
			{children}
		</EntityContainer>
	);
}
export default CredentialsContainer;
