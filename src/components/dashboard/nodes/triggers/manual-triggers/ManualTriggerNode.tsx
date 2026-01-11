"use client";

import { type NodeProps as TNodeProps } from "@xyflow/react";

import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger";

import { memo, useState } from "react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchManualTriggerRealtimeToken } from "@/actions/executions/manual-trigger/actions";

import { MousePointerIcon } from "lucide-react";
import BaseTriggerNode from "../BaseTriggerNode";
import ManualTriggerDialog from "./ManualTriggerDialog";

function ManualTriggerNode(props: TNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: MANUAL_TRIGGER_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchManualTriggerRealtimeToken,
	});

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
