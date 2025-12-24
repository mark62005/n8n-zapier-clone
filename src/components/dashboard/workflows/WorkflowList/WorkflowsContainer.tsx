"use client";

import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";
import EntityContainer from "../../entities/EntityContainer";
import WorkflowsHeader from "./WorkflowsHeader";
import WorkflowsSearch from "./WorkflowsSearch";
import WorkflowsPagination from "./WorkflowsPagination";

function WorkflowsContainer({ children }: IGeneralLayoutProps) {
	return (
		<EntityContainer
			header={<WorkflowsHeader />}
			search={<WorkflowsSearch />}
			pagination={<WorkflowsPagination />}
		>
			{children}
		</EntityContainer>
	);
}
export default WorkflowsContainer;
