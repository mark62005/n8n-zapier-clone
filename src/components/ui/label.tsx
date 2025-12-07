"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils/index";

/**
 * Render a styled label element based on Radix UI's Label primitive.
 *
 * The rendered element includes a `data-slot="label"` attribute and a set of default
 * utility classes; any provided `className` is appended to those defaults.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @returns The rendered LabelPrimitive.Root element with composed classes and `data-slot="label"`
 */
function Label({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className
			)}
			{...props}
		/>
	);
}

export { Label };