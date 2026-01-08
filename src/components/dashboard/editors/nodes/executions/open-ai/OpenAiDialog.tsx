"use client";

import { type IOpenAiDialogProps } from "@/types/app/components/component-props/dashboard/editors/nodes/ai/openai";
import { type TOpenAiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/openai";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { openAiNodeSettingsFormSchema } from "@/components/forms/dashboard/OpenAiNodeSettingsForm";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function OpenAiDialog({
	open,
	onOpenChange,
	defaultValues,
	onSubmit,
}: IOpenAiDialogProps) {
	const form = useForm<TOpenAiNodeSettingsFormValues>({
		resolver: zodResolver(openAiNodeSettingsFormSchema),
		defaultValues: {
			variableName: defaultValues?.variableName || "",
			systemPrompt: defaultValues?.systemPrompt || "",
			userPrompt: defaultValues?.userPrompt || "",
		},
	});

	// Reset form values when dialog opens with new defaults
	useEffect(() => {
		if (open) {
			form.reset({
				variableName: defaultValues?.variableName || "",
				systemPrompt: defaultValues?.systemPrompt || "",
				userPrompt: defaultValues?.userPrompt || "",
			});
		}
	}, [open, form, defaultValues]);

	const watchVariableName = form.watch("variableName") || "my_openai";

	function handleSubmit(values: TOpenAiNodeSettingsFormValues) {
		onSubmit(values);
		onOpenChange(false);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>OpenAI Configuration</DialogTitle>
					<DialogDescription>
						Configure the AI model and prompts for this node.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8 mt-4"
					>
						{/* VARIABLE NAME */}
						<FormField
							control={form.control}
							name="variableName"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="variableName">Variable Name</FormLabel>

									<FormControl>
										<Input
											id="variableName"
											placeholder="my_openai"
											required
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Use this name to reference the result in other nodes:{" "}
										{`{{${watchVariableName}.text}}`}
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* SYSTEM PROMPT (OPTIONAL) */}
						<FormField
							control={form.control}
							name="systemPrompt"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="systemPrompt">
										System Prompt (Optional)
									</FormLabel>

									<FormControl>
										<Textarea
											id="systemPrompt"
											placeholder="You are a helpful assistant."
											className="min-h-[80px] font-mono text-sm"
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Sets the behavior of the assistant. Use {"{{variables}}"}{" "}
										for simple values or {"{{json variable}}"} to stringify
										objects.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* USER PROMPT */}
						<FormField
							control={form.control}
							name="userPrompt"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="userPrompt">User Prompt</FormLabel>

									<FormControl>
										<Textarea
											id="userPrompt"
											placeholder={
												"Summarize this text: {{json httpResponse.data}}"
											}
											className="min-h-[120px] font-mono text-sm"
											{...field}
										/>
									</FormControl>

									<FormDescription>
										The prompt to send to the AI. Use {"{{variables}}"} for
										simple values or {"{{json variables}}"} to stringify
										objects.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* SAVE BUTTON */}
						<DialogFooter className="mt-4">
							<Button type="submit">Save</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
export default OpenAiDialog;
