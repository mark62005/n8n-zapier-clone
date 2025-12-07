"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils/index";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
);

/**
 * Provides a form item container that supplies a stable `id` to descendants via context for accessibility.
 *
 * @param props - Standard div props; children are rendered inside the container.
 * @returns The React element for the form item.
 */
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

/**
 * Render a form label tied to the current form field and its accessibility id, reflecting error state in styling.
 *
 * @param className - Additional CSS class names applied to the label
 * @param props - Props forwarded to the underlying LabelPrimitive.Root
 * @returns The label element associated with the current form item
 */
function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

/**
 * Renders a form control slot with accessibility attributes derived from the current form field state.
 *
 * The rendered Slot is given an id for the form item, an `aria-describedby` that includes the description and, when an error exists, the error message id, and `aria-invalid` when the field has an error. All other props are forwarded to the Slot.
 *
 * @returns A Slot element configured with `id`, `aria-describedby`, `aria-invalid`, `data-slot="form-control"`, and any forwarded props.
 */
function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

/**
 * Renders the accessible description text for a form field.
 *
 * The element is assigned an id tied to the current form field so it can be referenced
 * by form controls via `aria-describedby` and is styled with muted, small text by default.
 *
 * @param className - Additional CSS class names appended to the default description styles
 * @param props - Additional attributes forwarded to the underlying `<p>` element
 * @returns The `<p>` element containing the form field description with an accessibility id
 */
function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

/**
 * Renders the field's message or error text tied to the current form field.
 *
 * If the field has a validation error, displays the error message; otherwise displays the component's children.
 * If there is no message to show, renders nothing.
 *
 * @returns The paragraph element containing the message when present, `null` when there is no message.
 */
function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	);
}

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};