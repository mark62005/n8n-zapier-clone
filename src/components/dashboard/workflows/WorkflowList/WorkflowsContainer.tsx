"use client";

import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";
import EntityContainer from "../../entities/EntityContainer";
import WorkflowsHeader from "./WorkflowsHeader";

function WorkflowsContainer({ children }: IGeneralLayoutProps) {
	return (
		<EntityContainer
			header={<WorkflowsHeader />}
			search={<></>}
			pagination={<></>}
		>
			{children}
		</EntityContainer>
	);
}
export default WorkflowsContainer;
