"use client";

import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";
import { NodeType as TNodeType } from "@/generated/prisma/enums";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { INodeTypeOption } from "@/types/app/components/dashboard/editor/nodes/INodeTypeOption";
import { INodeSelectorProps } from "@/types/app/components/component-props/dashboard/editors/nodes/INodeSelectorProps";

const triggerNodes: INodeTypeOption[] = [
	// MANUAL TRIGGER
	{
		type: TNodeType.MANUAL_TRIGGER,
		label: "Trigger manually",
		description:
			"Runs the flow on clicking a button. Good for getting started quickly.",
		icon: MousePointerIcon,
	},
	// GOOGLE FORM TRIGGER
	{
		type: TNodeType.GOOGLE_FORM_TRIGGER,
		label: "Google Form",
		description: "Runs the flow when a Google Form is submitted.",
		icon: "/logos/googleform.svg",
	},
];

const executionNodes: INodeTypeOption[] = [
	{
		type: TNodeType.HTTP_REQUEST,
		label: "HTTP Request",
		description: "Makes an HTTP request",
		icon: GlobeIcon,
	},
];

function NodeSelector({ open, onOpenChange, children }: INodeSelectorProps) {
	const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

	const handleNodeSelect = useCallback(
		(nodeTypeOption: INodeTypeOption) => {
			// Check if trying to add a manual trigger when one already exists
			if (nodeTypeOption.type === TNodeType.MANUAL_TRIGGER) {
				const nodes = getNodes();
				const hasManualTrigger = nodes.some(
					(node) => node.type === TNodeType.MANUAL_TRIGGER
				);

				if (hasManualTrigger) {
					toast.error("Only 1 manual trigger is allowed per workflow.");
					return;
				}
			}

			setNodes((nodes) => {
				const hasInitialTrigger = nodes.some(
					(node) => node.type === TNodeType.INITIAL
				);

				const centerX = window.innerWidth / 2;
				const centerY = window.innerHeight / 2;

				const flowPosition = screenToFlowPosition({
					x: centerX + (Math.random() - 0.5) * 200,
					y: centerY + (Math.random() - 0.5) * 200,
				});

				const newNode = {
					id: createId(),
					data: {},
					position: flowPosition,
					type: nodeTypeOption.type,
				};

				if (hasInitialTrigger) {
					return [newNode];
				}

				return [...nodes, newNode];
			});

			onOpenChange(false);
		},
		[setNodes, getNodes, onOpenChange, screenToFlowPosition]
	);

	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent
				side="right"
				className="w-full sm:max-w-md overflow-y-auto"
			>
				<SheetHeader>
					<SheetTitle>What triggers this workflow?</SheetTitle>

					<SheetDescription>
						A trigger is a step that starts your workflow.
					</SheetDescription>
				</SheetHeader>

				{/* TRIGGER NODES */}
				<div>
					{triggerNodes.map((nodeTypeOption) => {
						const Icon = nodeTypeOption.icon;

						return (
							<div
								key={nodeTypeOption.type}
								onClick={() => {
									handleNodeSelect(nodeTypeOption);
								}}
								className="w-full h-auto justify-start py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
							>
								<div className="w-full flex items-center gap-6 overflow-hidden">
									{typeof Icon === "string" ? (
										<img
											src={Icon}
											alt={nodeTypeOption.label}
											className="size-5 object-contain rounded-sm"
										/>
									) : (
										<Icon className="size-5" />
									)}

									{/* LABEL & DESCRIPTION */}
									<div className="flex flex-col items-start text-left">
										<span className="font-medium text-sm">
											{nodeTypeOption.label}
										</span>

										<span className="text-xs text-muted-foreground">
											{nodeTypeOption.description}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<Separator />

				{/* EXECUTION NODES */}
				<div>
					{executionNodes.map((nodeTypeOption) => {
						const Icon = nodeTypeOption.icon;

						return (
							<div
								key={nodeTypeOption.type}
								onClick={() => {
									handleNodeSelect(nodeTypeOption);
								}}
								className="w-full h-auto justify-start py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
							>
								<div className="w-full flex items-center gap-6 overflow-hidden">
									{typeof Icon === "string" ? (
										<img
											src={Icon}
											alt={nodeTypeOption.label}
											className="size-5 object-contain rounded-sm"
										/>
									) : (
										<Icon className="size-5" />
									)}

									{/* LABEL & DESCRIPTION */}
									<div className="flex flex-col items-start text-left">
										<span className="font-medium text-sm">
											{nodeTypeOption.label}
										</span>

										<span className="text-xs text-muted-foreground">
											{nodeTypeOption.description}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}
export default NodeSelector;
