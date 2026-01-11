"use client";

import { type IExecutionItemProps } from "@/types/app/components/component-props/dashboard/executions";
import { type ExecutionStatus as TExecutionStatus } from "@/generated/prisma/enums";

import { ExecutionStatus } from "@/generated/prisma/enums";

import { formatDistanceToNow } from "date-fns";

import EntityItem from "../../entities/EntityItem";
import { CheckCircle2Icon, ClockIcon } from "lucide-react";

function getStatusIcon(status: TExecutionStatus) {
	switch (status) {
		case ExecutionStatus.SUCCESS:
			return <CheckCircle2Icon className="size-5 text-green-600" />;
		case ExecutionStatus.FAILED:
			return <CheckCircle2Icon className="size-5 text-red-600" />;
		case ExecutionStatus.RUNNING:
			return <CheckCircle2Icon className="size-5 text-blue-600 animate-spin" />;

		default:
			return <ClockIcon className="size-5 text-muted-foreground" />;
	}
}

function ExecutionItem({ data }: IExecutionItemProps) {
	const { id, status, startedAt, completedAt, workflow } = data;

	const duration = completedAt
		? Math.round(
				(new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000
			)
		: null;

	const subtitle = (
		<>
			{workflow.name} &bull; Started{" "}
			{formatDistanceToNow(startedAt, { addSuffix: true })}
			{duration !== null && <>&bull; Took {duration}s</>}
		</>
	);

	return (
		<EntityItem
			href={`/executions/${id}`}
			title={status}
			subtitle={subtitle}
			image={
				<div className="size-8 flex items-center justify-center">
					{getStatusIcon(status)}
				</div>
			}
		/>
	);
}
export default ExecutionItem;
