import { SaveIcon } from "lucide-react";
import { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import { Button } from "@/components/ui/button";

function SaveEditorButton({ workflowId }: IGeneralEditorProps) {
	function handleSaveClick() {}

	return (
		<div className="ml-auto">
			<Button
				size="sm"
				onClick={handleSaveClick}
				disabled={false}
			>
				<SaveIcon className="size-4" />
				Save
			</Button>
		</div>
	);
}
export default SaveEditorButton;
