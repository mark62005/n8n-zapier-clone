"use client";

import { type ISlackDialogProps } from "@/types/app/components/component-props/dashboard/editors/nodes/messagers/slack";
import { type TSlackNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/slack";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { slackNodeSettingsFormSchema } from "@/components/forms/nodes/messagers/SlackNodeSettingsForm";

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

const DEFAULT_VAR_NAME = "my_slack" as const;

function SlackDialog({
	open,
	onOpenChange,
	defaultValues,
	onSubmit,
}: ISlackDialogProps) {
	const form = useForm<TSlackNodeSettingsFormValues>({
		resolver: zodResolver(slackNodeSettingsFormSchema),
		defaultValues: {
			variableName: defaultValues?.variableName || "",
			content: defaultValues?.content || "",
			webhookUrl: defaultValues?.webhookUrl || "",
		},
	});

	// Reset form values when dialog opens with new defaults
	useEffect(() => {
		if (open) {
			form.reset({
				variableName: defaultValues?.variableName || "",
				content: defaultValues?.content || "",
				webhookUrl: defaultValues?.webhookUrl || "",
			});
		}
	}, [open, form, defaultValues]);

	const watchVariableName = form.watch("variableName") || DEFAULT_VAR_NAME;

	function handleSubmit(values: TSlackNodeSettingsFormValues) {
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
					<DialogTitle>Slack Configuration</DialogTitle>
					<DialogDescription>
						Configure the Slack webhook settings for this node.
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
											placeholder={DEFAULT_VAR_NAME}
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

						{/* WEBHOOK URL */}
						<FormField
							control={form.control}
							name="webhookUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="webhookUrl">Webhook URL</FormLabel>

									<FormControl>
										<Input
											id="webhookUrl"
											placeholder="https://hooks.slack.com/services/..."
											required
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Get this from Slack: Workspace Settings → Workflows →
										Webhooks
									</FormDescription>
									<FormDescription>
										Make sure the &quot;key&quot; is &quot;content&quot;.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* CONTENT */}
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="content">Message Content</FormLabel>

									<FormControl>
										<Textarea
											id="content"
											placeholder="Summary: {{variable.text}}"
											className="min-h-[80px] font-mono text-sm"
											{...field}
										/>
									</FormControl>

									<FormDescription>
										The message to send. Use {"{{variable}}"} for simple values
										or {"{{json variables}}"} to stringify objects.
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
export default SlackDialog;
