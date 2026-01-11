import { type ReactNode } from "react";

export interface IWorkflowNodeProps {
	children: ReactNode;
	name?: string;
	description?: string;
	showToolbar?: boolean;
	onDelete?: () => void;
	onSettings?: () => void;
}
