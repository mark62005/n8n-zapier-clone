"use client";

import type { INodeDialogProps } from "@/types/app/components/component-props/dashboard/editors/nodes/INodeDialogProps";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

function ManualTriggerDialog({ open, onOpenChange }: INodeDialogProps) {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Manual Trigger</DialogTitle>
					<DialogDescription>
						Configure settings for the manual trigger node.
					</DialogDescription>

					<div className="py-4">
						<p className="text-sm text-muted-foreground">
							No configuration available, usage to manually execute a workflow.
						</p>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
export default ManualTriggerDialog;
