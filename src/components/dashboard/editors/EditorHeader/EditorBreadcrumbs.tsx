import Link from "next/link";
import { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EditorNameInput from "./EditorNameInput";

function EditorBreadcrumbs({ workflowId }: IGeneralEditorProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link
							href="/workflows"
							prefetch
						>
							Workflows
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<EditorNameInput workflowId={workflowId} />
			</BreadcrumbList>
		</Breadcrumb>
	);
}
export default EditorBreadcrumbs;
