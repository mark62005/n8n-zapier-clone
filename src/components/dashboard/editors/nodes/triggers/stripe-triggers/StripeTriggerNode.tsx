"use client";

import { type NodeProps as TNodeProps } from "@xyflow/react";

import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/stripe-trigger-channel";

import { memo, useState } from "react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchStripeTriggerRealtimeToken } from "@/actions/executions/stripe-trigger";

import BaseTriggerNode from "../BaseTriggerNode";
import StripeTriggerDialog from "./StripeTriggerDialog";

function StripeTriggerNode(props: TNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: STRIPE_TRIGGER_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchStripeTriggerRealtimeToken,
	});

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	return (
		<>
			<StripeTriggerDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
			/>

			<BaseTriggerNode
				{...props}
				Icon="/logos/stripe.svg"
				name="Stripe"
				description="When Stripe event is captured"
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

StripeTriggerNode.displayName = "StripeTriggerNode";

export default memo(StripeTriggerNode);
