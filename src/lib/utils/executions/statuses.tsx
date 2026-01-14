import { type ReactNode } from "react";
import { type ExecutionStatus as TExecutionStatus } from "@/generated/prisma/enums";

import { ExecutionStatus } from "@/generated/prisma/enums";

import {
	CheckCircle2Icon,
	XCircleIcon,
	Loader2Icon,
	ClockIcon,
} from "lucide-react";

export function getStatusIcon(status: TExecutionStatus): ReactNode {
	switch (status) {
		case ExecutionStatus.SUCCESS:
			return <CheckCircle2Icon className="size-5 text-green-600" />;
		case ExecutionStatus.FAILED:
			return <XCircleIcon className="size-5 text-red-600" />;
		case ExecutionStatus.RUNNING:
			return <Loader2Icon className="size-5 text-blue-600 animate-spin" />;

		default:
			return <ClockIcon className="size-5 text-muted-foreground" />;
	}
}

export function getFormattedStatus(status: TExecutionStatus): string {
	return status.charAt(0) + status.slice(1).toLowerCase();
}
