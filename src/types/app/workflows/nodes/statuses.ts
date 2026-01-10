import { type TNodeStatus } from "@/components/ui/react-flow/node-status-indicator";

export type TExecutableNodeStatus = Exclude<TNodeStatus, "initial">;
