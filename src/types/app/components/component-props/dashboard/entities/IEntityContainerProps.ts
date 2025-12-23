import { ReactNode } from "react";

export interface IEntityContainerProps {
	children: ReactNode;
	header?: ReactNode;
	search?: ReactNode;
	pagination?: ReactNode;
}
