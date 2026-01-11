"use client";

import { memo, useState } from "react";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NodeSelector from "../../nodes/NodeSelector";

function AddNodeButton() {
	const [selectorOpen, setSelectorOpen] = useState<boolean>(false);

	return (
		<NodeSelector
			open={selectorOpen}
			onOpenChange={setSelectorOpen}
		>
			<Button
				size="icon"
				variant="outline"
				className="bg-background"
			>
				<PlusIcon />
			</Button>
		</NodeSelector>
	);
}

AddNodeButton.displayName = "AddNodeButton";

export default memo(AddNodeButton);
