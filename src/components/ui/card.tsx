import * as React from "react";

import { cn } from "@/lib/utils/index";

/**
 * Root container component for a card layout.
 *
 * Renders a div with `data-slot="card"`, applies the component's base card styles, and forwards all received div props to the underlying element.
 *
 * @param className - Additional CSS classes to merge with the component's base styles.
 * @param props - Additional div props forwarded to the underlying element.
 * @returns The rendered card container div element.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
				className
			)}
			{...props}
		/>
	);
}

/**
 * Header section of a Card layout.
 *
 * Renders a div configured as the card's header with the `data-slot="card-header"` attribute and composed styling classes; forwards all standard div props.
 *
 * @returns A div element configured as the card header
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className
			)}
			{...props}
		/>
	);
}

/**
 * Title area within a Card.
 *
 * Renders a div used for the card's title with typography classes and `data-slot="card-title"`.
 *
 * @returns A div element styled as the card title
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

/**
 * Renders the card's description area.
 *
 * @param className - Additional CSS class names appended to the default description styles
 * @param props - Other div props forwarded to the underlying element
 * @returns A div element with `data-slot="card-description"` and muted, small-text styling
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

/**
 * Renders the card's action container positioned within the header grid.
 *
 * Forwards all received div props to the underlying element and applies a composed
 * className for grid placement. The element is marked with `data-slot="card-action"`.
 *
 * @returns A div element with `data-slot="card-action"` for positioning action elements in the card.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	);
}

/**
 * Renders the card's main content area.
 *
 * @param className - Additional CSS classes to append to the content container
 * @returns A div element with data-slot="card-content" and default horizontal padding
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

/**
 * Card footer container used to render actions or metadata at the bottom of a Card.
 *
 * Renders a div with slot "card-footer", applies footer layout and spacing classes, and forwards all provided div props.
 *
 * @returns The rendered footer element for a Card.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};