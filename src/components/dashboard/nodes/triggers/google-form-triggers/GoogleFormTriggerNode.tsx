"use client";

import { type NodeProps as TNodeProps } from "@xyflow/react";

import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/google-form-trigger";

import { memo, useState } from "react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchGoogleFormTriggerRealtimeToken } from "@/actions/executions/google-form-trigger/actions";

import BaseTriggerNode from "../BaseTriggerNode";
import GoogleFormTriggerDialog from "./GoogleFormTriggerDialog";

function GoogleFormTriggerNode(props: TNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchGoogleFormTriggerRealtimeToken,
	});

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	return (
		<>
			<GoogleFormTriggerDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
			/>

			<BaseTriggerNode
				{...props}
				Icon="/logos/googleform.svg"
				name="Google Form"
				description="When the form is submitted"
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

GoogleFormTriggerNode.displayName = "GoogleFormTriggerNode";

export default memo(GoogleFormTriggerNode);
