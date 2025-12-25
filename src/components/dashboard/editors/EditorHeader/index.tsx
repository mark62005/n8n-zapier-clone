"use client";

import { APP_HEADER_CLASSNAME } from "@/lib/constants/configs/dashboard/app-header";
import { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import { SidebarTrigger } from "@/components/ui/sidebar";
import EditorBreadcrumbs from "./EditorBreadcrumbs";
import SaveEditorButton from "./SaveEditorButton";

function EditorHeader({ workflowId }: IGeneralEditorProps) {
	return (
		<header className={APP_HEADER_CLASSNAME}>
			<SidebarTrigger />

			<div className="flex flex-row items-center justify-between gap-x-4 w-full">
				<EditorBreadcrumbs workflowId={workflowId} />
				<SaveEditorButton workflowId={workflowId} />
			</div>
		</header>
	);
}
export default EditorHeader;
