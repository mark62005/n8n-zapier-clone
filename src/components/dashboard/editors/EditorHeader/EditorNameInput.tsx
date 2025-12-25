import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import type { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import { useSuspenseWorkflowById } from "@/hooks/workflows/use-suspense-workflow-by-id";
import { useUpdateWorkflowName } from "@/hooks/workflows/use-update-workflow-name";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";

function EditorNameInput({ workflowId }: IGeneralEditorProps) {
	const { data: workflow } = useSuspenseWorkflowById(workflowId);
	const updateWorkflowName = useUpdateWorkflowName();

	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(workflow.name);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (workflow.name) {
			setName(workflow.name);
		}
	}, [workflow.name]);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	function handleBreadcrumbItemClick() {
		setIsEditing(true);
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setName(e.target.value.trim());
	}

	async function handleSaveName() {
		if (name === workflow.name) {
			setIsEditing(false);
			return;
		}

		setIsEditing(false);
		try {
			await updateWorkflowName.mutateAsync({
				id: workflowId,
				name,
			});
		} catch (error) {
			setName(workflow.name);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter") {
			handleSaveName();
		} else if (e.key === "Escape") {
			setName(workflow.name);
			setIsEditing(false);
		}
	}

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				value={name}
				onChange={handleInputChange}
				onBlur={handleSaveName}
				onKeyDown={handleKeyDown}
				disabled={updateWorkflowName.isPending}
				className="h-7 w-auto min-w-[800px] px-2"
			/>
		);
	}

	return (
		<BreadcrumbItem
			onClick={handleBreadcrumbItemClick}
			className="cursor-pointer hover:text-foreground transition-colors"
		>
			<div className=""></div>
			{workflow.name}
		</BreadcrumbItem>
	);
}
export default EditorNameInput;
