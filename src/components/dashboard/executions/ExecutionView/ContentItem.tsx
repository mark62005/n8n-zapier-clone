import { type ReactNode } from "react";

interface IContentItemProps {
	label: string;
	children: ReactNode;
}

function ContentItem({ label, children }: IContentItemProps) {
	return (
		<div>
			<p className="text-sm font-medium text-muted-foreground">{label}</p>
			<div className="text-sm">{children}</div>
		</div>
	);
}
