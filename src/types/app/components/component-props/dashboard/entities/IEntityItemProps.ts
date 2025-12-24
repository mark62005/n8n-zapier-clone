import { ReactNode } from "react";

export interface IEntityItemProps {
	href: string;
	title: string;
	subtitle?: ReactNode;
	image?: ReactNode;
	actions?: ReactNode;
	onRemove?: () => void | Promise<void>;
	isRemoving?: boolean;
	className?: string;
}
