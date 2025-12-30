import type { ReactNode } from "react";

export interface INodeSelectorProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}
