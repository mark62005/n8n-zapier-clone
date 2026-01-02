"use client";

import { memo, useState } from "react";
import { type NodeProps as TNodeProps } from "@xyflow/react";
import type { TNodeStatus } from "@/components/ui/react-flow/node-status-indicator";
import { MousePointerIcon } from "lucide-react";
import BaseTriggerNode from "./BaseTriggerNode";
import ManualTriggerDialog from "./ManualTriggerDialog";

function ManualTriggerNode(props: TNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const nodeStatus: TNodeStatus = "initial";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	return (
		<>
			<ManualTriggerDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
			/>

			<BaseTriggerNode
				{...props}
				Icon={MousePointerIcon}
				name="When clicking 'Execute workflow"
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

ManualTriggerNode.displayName = "ManualTriggerNode";

export default memo(ManualTriggerNode);
