"use client";

import { type IExecutionViewProps } from "@/types/app/components/component-props/dashboard/executions";

import { useSuspenseExecutionById } from "@/hooks/use-executions";

import ExecutionForm from "@/components/forms/dashboard/executions/ExecutionForm";

function ExecutionView({ executionId }: IExecutionViewProps) {
	const { data: execution } = useSuspenseExecutionById(executionId);

	return <ExecutionForm initialData={execution} />;
}
export default ExecutionView;
