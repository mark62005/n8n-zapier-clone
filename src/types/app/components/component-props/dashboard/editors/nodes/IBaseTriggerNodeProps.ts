import type { ReactNode as TReactNode } from "react";
import type { NodeProps as TNodeProps } from "@xyflow/react";
import type { LucideIcon as TLucideIcon } from "lucide-react";

export interface IBaseTriggerNodeProps extends TNodeProps {
	Icon: TLucideIcon | string;
	name: string;
	description?: string;
	// status?: NodeStatus
	onSettings?: () => void;
	onDoubleClick?: () => void;
	children?: TReactNode;
}
