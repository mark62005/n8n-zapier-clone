"use client";

import { type IExecutionViewProps } from "@/types/app/components/component-props/dashboard/executions";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSuspenseExecutionById } from "@/hooks/use-executions";
import { cn } from "@/lib/utils";
import {
	getStatusIcon,
	getFormattedStatus,
	getDuration,
} from "@/lib/utils/executions";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

const CONTENT_ITEM_TITLE_CLASSNAME =
	"text-sm font-medium text-muted-foreground capitalize" as const;
const CONTENT_ITEM_DESCRIPTION_CLASSNAME = "text-sm" as const;

function ExecutionView({ executionId }: IExecutionViewProps) {
	const [isShowingStackTrace, setIsShowingStackTrace] =
		useState<boolean>(false);

	const { data: execution } = useSuspenseExecutionById(executionId);
	const {
		status,
		startedAt,
		completedAt,
		workflowId,
		workflow,
		inngestEventId,
		output,
		error,
		errorStack,
	} = execution;

	const duration = getDuration(startedAt, completedAt);

	return (
		<Card className="shadow-none">
			{/* HEADER */}
			<CardHeader>
				<div className="flex items-center gap-3">
					{getStatusIcon(status)}

					<div className="">
						<CardTitle>{getFormattedStatus(status)}</CardTitle>

						<CardDescription>Execution for {workflow.name}</CardDescription>
					</div>
				</div>
			</CardHeader>

			{/* CONTENT */}
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<ContentItem
						variant="workflow-name"
						workflowId={workflowId}
						label={workflow.name}
					/>

					<ContentItem
						variant="status"
						label={getFormattedStatus(status)}
					/>

					<ContentItem
						variant="started"
						label={formatDistanceToNow(startedAt, { addSuffix: true })}
					/>

					{completedAt && (
						<ContentItem
							variant="completed"
							label={formatDistanceToNow(completedAt, { addSuffix: true })}
						/>
					)}

					{duration && (
						<ContentItem
							variant="duration"
							label={`${duration}s`}
						/>
					)}

					<ContentItem
						variant="event-id"
						label={inngestEventId}
					/>
				</div>

				{/* ERROR */}
				{error && (
					<div className="col-span-2 mt-6 p-4 bg-red-50 rounded-md space-y-3">
						<ContentItem
							variant="error"
							label={error}
						/>

						{/* ERROR STACK */}
						{errorStack && (
							<Collapsible
								open={isShowingStackTrace}
								onOpenChange={setIsShowingStackTrace}
							>
								<CollapsibleTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="text-red-900 hover:bg-red-100"
									>
										{isShowingStackTrace ? "Hide" : "Show"} stack trace
									</Button>
								</CollapsibleTrigger>

								<CollapsibleContent>
									<pre className="text-xs font-mono text-red-800 mt-2 p-2 bg-red-100 rounded overflow-auto">
										{errorStack}
									</pre>
								</CollapsibleContent>
							</Collapsible>
						)}
					</div>
				)}

				{/* OUTPUT */}
				{output && (
					<div className="mt-6 p-4 bg-muted rounded-md">
						<p className="text-sm font-medium mb-2">Output</p>

						<pre className="text-xs font-mono overflow-auto">
							{JSON.stringify(output, null, 2)}
						</pre>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
export default ExecutionView;

interface IContentItemProps {
	variant?:
		| "workflow-name"
		| "status"
		| "started"
		| "completed"
		| "duration"
		| "event-id"
		| "error"
		| "errorStack";
	workflowId?: string;
	label: string;
}

function ContentItem({ variant, workflowId, label }: IContentItemProps) {
	switch (variant) {
		case "workflow-name":
			return (
				<div>
					<p className={CONTENT_ITEM_TITLE_CLASSNAME}>Workflow</p>

					<Link
						href={`/workflows/${workflowId}`}
						className={cn(
							"text-primary hover:underline",
							CONTENT_ITEM_DESCRIPTION_CLASSNAME
						)}
						prefetch
					>
						{label}
					</Link>
				</div>
			);

		case "error":
			return (
				<div>
					<p className="text-sm font-medium text-red-900 mb-2 capitalize">
						{variant}
					</p>
					<p className="text-sm text-red-800 font-mono">{label}</p>
				</div>
			);

		case "status":
		case "started":
		case "completed":
		case "duration":
		case "event-id":
			const title = variant === "event-id" ? "Event ID" : variant;

			return (
				<div>
					<p className={CONTENT_ITEM_TITLE_CLASSNAME}>{title}</p>
					<p className={CONTENT_ITEM_DESCRIPTION_CLASSNAME}>{label}</p>
				</div>
			);
		default:
			return <></>;
	}
}
