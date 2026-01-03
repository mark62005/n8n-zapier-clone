import type { ReactFlowInstance as TReactFlowInstance } from "@xyflow/react";
import { atom } from "jotai";

export const editorAtom = atom<TReactFlowInstance | null>(null);
