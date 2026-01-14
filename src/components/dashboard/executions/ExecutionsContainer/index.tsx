"use client";

import { type IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";

import EntityContainer from "../../entities/EntityContainer";
import ExecutionsHeader from "./ExecutionsHeader";
import ExecutionsPagination from "./ExecutionsPagination";

function ExecutionsContainer({ children }: IGeneralLayoutProps) {
	return (
		<EntityContainer
			header={<ExecutionsHeader />}
			pagination={<ExecutionsPagination />}
		>
			{children}
		</EntityContainer>
	);
}
export default ExecutionsContainer;
