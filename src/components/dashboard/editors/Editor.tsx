"use client";

import { useState, useCallback } from "react";
import {
	type Node as TNode,
	type Edge as TEdge,
	type NodeChange as TNodeChange,
	type EdgeChange as TEdgeChange,
	type Connection as TConnection,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	Panel,
} from "@xyflow/react";
import { useSetAtom } from "jotai";
import { editorAtom } from "@/store/atoms";
import { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import { useSuspenseWorkflowById } from "@/hooks/workflows/use-suspense-workflow-by-id";
import { NODE_COMPONENTS_CONFIG } from "@/lib/constants/configs/dashboard/editors/node-components";
import AddNodeButton from "./buttons/AddNodeButton";

import "@xyflow/react/dist/style.css";

function Editor({ workflowId }: IGeneralEditorProps) {
	const { data: workflow } = useSuspenseWorkflowById(workflowId);

	const setEditor = useSetAtom(editorAtom);

	const [nodes, setNodes] = useState<TNode[]>(workflow.nodes);
	const [edges, setEdges] = useState<TEdge[]>(workflow.edges);

	const onNodesChange = useCallback(
		(changes: TNodeChange[]) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	);
	const onEdgesChange = useCallback(
		(changes: TEdgeChange[]) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	);
	const onConnect = useCallback(
		(params: TConnection) =>
			setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[]
	);

	return (
		<div className="size-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={NODE_COMPONENTS_CONFIG}
				onInit={setEditor}
				fitView
			>
				<Background />
				<Controls />
				<MiniMap />

				<Panel position="top-right">
					<AddNodeButton />
				</Panel>
			</ReactFlow>
		</div>
	);
}
export default Editor;
