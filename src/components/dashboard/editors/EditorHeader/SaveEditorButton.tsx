import { useAtomValue } from "jotai";
import { editorAtom } from "@/store/atoms";
import { useUpdateWorkflow } from "@/hooks/workflows/use-update-workflow";
import { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import { SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function SaveEditorButton({ workflowId }: IGeneralEditorProps) {
	const editor = useAtomValue(editorAtom);
	const saveWorkflow = useUpdateWorkflow();

	function handleSaveClick() {
		if (!editor) {
			return;
		}

		const nodes = editor.getNodes();
		const edges = editor.getEdges();

		saveWorkflow.mutate({
			id: workflowId,
			nodes,
			edges,
		});
	}

	return (
		<div className="ml-auto">
			<Button
				size="sm"
				onClick={handleSaveClick}
				disabled={saveWorkflow.isPending}
			>
				<SaveIcon className="size-4" />
				Save
			</Button>
		</div>
	);
}
export default SaveEditorButton;
