import type { NodeType as TNodeType } from "@/generated/prisma/enums";
import { ComponentType } from "react";

export interface INodeTypeOption {
	type: TNodeType;
	label: string;
	description: string;
	icon: ComponentType<{ className?: string }> | string;
}
