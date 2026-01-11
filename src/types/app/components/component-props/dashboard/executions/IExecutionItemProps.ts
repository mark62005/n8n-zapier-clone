import type { Execution as TExecution } from "@/generated/prisma/client";

export interface IExecutionItemProps {
	data: TExecution & {
		workflow: {
			id: string;
			name: string;
		};
	};
}
