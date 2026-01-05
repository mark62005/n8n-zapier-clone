import {
	type Connection as TConnection,
	type Node as TNode,
} from "@/generated/prisma/client";

import toposort from "toposort";

export function topologicalSort(
	nodes: TNode[],
	connections: TConnection[]
): TNode[] {
	// If no connections, return node as-is
	if (connections.length === 0) {
		return nodes;
	}

	// Create edges array for toposort
	const edges: [string, string][] = connections.map((c) => [
		c.fromNodeId,
		c.toNodeId,
	]);

	// Add nodes with no connections as self-edges to ensure they're included
	const connectedNodeSet = new Set<string>();
	for (const c of connections) {
		connectedNodeSet.add(c.fromNodeId);
		connectedNodeSet.add(c.toNodeId);
	}

	for (const n of nodes) {
		if (!connectedNodeSet.has(n.id)) {
			edges.push([n.id, n.id]);
		}
	}

	// Perform topological sort
	let sortedNodeIds: string[];
	try {
		sortedNodeIds = toposort(edges);

		// Remove duplicates from self-edges
		sortedNodeIds = [...new Set(sortedNodeIds)];
	} catch (error) {
		if (error instanceof Error && error.message.includes("Cyclic")) {
			throw new Error("Workflow contains a cycle.");
		}

		throw error;
	}

	// Map sorted IDs back to node objects
	const nodeMap = new Map(nodes.map((n) => [n.id, n]));
	return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
}
