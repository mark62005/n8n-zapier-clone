import { type ReactNode as TReactNode } from "react";
import { type NodeProps as TNodeProps } from "@xyflow/react";
import { type LucideIcon as TLucideIcon } from "lucide-react";
import { type TNodeStatus } from "@/components/ui/react-flow/node-status-indicator";

export interface IBaseExecutionNodeProps extends TNodeProps {
	Icon: TLucideIcon | string;
	name: string;
	description?: string;
	status?: TNodeStatus;
	onSettings?: () => void;
	onDoubleClick?: () => void;
	children?: TReactNode;
}
