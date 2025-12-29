"use client";

import { memo } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function AddNodeButton() {
	function handleClick() {
		console.log("AddNodeButton clicked.");
	}

	return (
		<Button
			size="icon"
			variant="outline"
			onClick={handleClick}
			className="bg-background"
		>
			<PlusIcon />
		</Button>
	);
}

AddNodeButton.displayName = "AddNodeButton";

export default memo(AddNodeButton);
