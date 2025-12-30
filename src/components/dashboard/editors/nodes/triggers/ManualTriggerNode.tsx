"use client";

import { memo } from "react";
import { type NodeProps as TNodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import BaseTriggerNode from "./BaseTriggerNode";

function ManualTriggerNode(props: TNodeProps) {
	function handleOpenSettings() {
		// TODO
	}

	return (
		<>
			<BaseTriggerNode
				{...props}
				Icon={MousePointerIcon}
				name="When clicking 'Execute workflow"
				// TODO: status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

ManualTriggerNode.displayName = "ManualTriggerNode";

export default memo(ManualTriggerNode);
