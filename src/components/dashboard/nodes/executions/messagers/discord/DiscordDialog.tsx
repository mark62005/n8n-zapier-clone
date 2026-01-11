"use client";

import { type IDiscordDialogProps } from "@/types/app/components/component-props/dashboard/nodes/messagers/discord";
import { type TDiscordNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/discord";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { discordNodeSettingsFormSchema } from "@/components/forms/nodes/messagers/DiscordNodeSettingsForm";

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

const DEFAULT_VAR_NAME = "my_discord" as const;

function DiscordDialog({
	open,
	onOpenChange,
	defaultValues,
	onSubmit,
}: IDiscordDialogProps) {
	const form = useForm<TDiscordNodeSettingsFormValues>({
		resolver: zodResolver(discordNodeSettingsFormSchema),
		defaultValues: {
			variableName: defaultValues?.variableName || "",
			username: defaultValues?.username || "",
			content: defaultValues?.content || "",
			webhookUrl: defaultValues?.webhookUrl || "",
		},
	});

	// Reset form values when dialog opens with new defaults
	useEffect(() => {
		if (open) {
			form.reset({
				variableName: defaultValues?.variableName || "",
				username: defaultValues?.username || "",
				content: defaultValues?.content || "",
				webhookUrl: defaultValues?.webhookUrl || "",
			});
		}
	}, [open, form, defaultValues]);

	const watchVariableName = form.watch("variableName") || DEFAULT_VAR_NAME;

	function handleSubmit(values: TDiscordNodeSettingsFormValues) {
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
					<DialogTitle>Discord Configuration</DialogTitle>
					<DialogDescription>
						Configure the Discord webhook settings for this node.
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
											placeholder="https://discord.com/api/webhooks/..."
											required
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Get this from Discord: Channel Settings → Integrations →
										Webhooks
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

						{/* Username */}
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="username">
										Bot Username (Optional)
									</FormLabel>

									<FormControl>
										<Input
											id="username"
											placeholder="Workflow Bot"
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Override the webhook's default username.
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
export default DiscordDialog;
