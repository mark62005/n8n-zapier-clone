"use client";

import { type IExecutionItemProps } from "@/types/app/components/component-props/dashboard/executions";

import { formatDistanceToNow } from "date-fns";
import {
	getFormattedStatus,
	getStatusIcon,
	getDuration,
} from "@/lib/utils/executions";

import EntityItem from "../../entities/EntityItem";

function ExecutionItem({ data }: IExecutionItemProps) {
	const { id, status, startedAt, completedAt, workflow } = data;

	const duration = getDuration(startedAt, completedAt);

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
			title={getFormattedStatus(status)}
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
