"use client";

import { type IOpenAiDialogProps } from "@/types/app/components/component-props/dashboard/nodes/ai/openai";
import { type TOpenAiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/openai";

import { CredentialType } from "@/generated/prisma/enums";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCredentialsByType } from "@/hooks/use-credentials";
import { openAiNodeSettingsFormSchema } from "@/components/forms/dashboard/OpenAiNodeSettingsForm";

import Image from "next/image";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function OpenAiDialog({
	open,
	onOpenChange,
	defaultValues,
	onSubmit,
}: IOpenAiDialogProps) {
	const { data: credentials, isLoading: isLoadingCredentials } =
		useCredentialsByType(CredentialType.OPENAI);

	const form = useForm<TOpenAiNodeSettingsFormValues>({
		resolver: zodResolver(openAiNodeSettingsFormSchema),
		defaultValues: {
			variableName: defaultValues?.variableName || "",
			credentialId: defaultValues?.credentialId || "",
			systemPrompt: defaultValues?.systemPrompt || "",
			userPrompt: defaultValues?.userPrompt || "",
		},
	});

	// Reset form values when dialog opens with new defaults
	useEffect(() => {
		if (open) {
			form.reset({
				variableName: defaultValues?.variableName || "",
				credentialId: defaultValues?.credentialId || "",
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

						{/* CREDENTIAL ID */}
						<FormField
							control={form.control}
							name="credentialId"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="credentialId">
										OpenAI Credential(s)
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={isLoadingCredentials || !credentials?.length}
										required
									>
										<FormControl>
											<SelectTrigger
												id="credentialId"
												className="w-full"
											>
												<SelectValue placeholder="Select a Credential ID" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{credentials?.map((credential) => {
												const { id, name } = credential;

												return (
													<SelectItem
														key={id}
														value={id}
													>
														<div className="flex items-center gap-2">
															<Image
																src="/logos/openai.svg"
																alt={`Logo of OpenAI`}
																width={16}
																height={16}
															/>

															{name}
														</div>
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>

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
