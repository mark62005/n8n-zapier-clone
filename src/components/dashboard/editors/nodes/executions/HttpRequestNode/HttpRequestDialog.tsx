"use client";

import type { IHttpRequestDialogProps } from "@/types/app/components/component-props/dashboard/editors/nodes/http-request/IHttpRequestDialogProp";
import type { THttpRequestNodeSettingsFormValues } from "@/types/app/components/forms/nodes/http-request/THttpRequestNodeSettingsForm";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpRequestNodeSettingsFormSchema } from "@/components/forms/dashboard/HttpRequestNodeSettingsForm/schema";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function HttpRequestDialog({
	open,
	onOpenChange,
	defaultValues,
	onSubmit,
}: IHttpRequestDialogProps) {
	const form = useForm<THttpRequestNodeSettingsFormValues>({
		resolver: zodResolver(httpRequestNodeSettingsFormSchema),
		defaultValues: {
			endpoint: defaultValues?.endpoint || "",
			method: defaultValues?.method || "GET",
			body: defaultValues?.body || "",
		},
	});

	// Reset form values when dialog opens with new defaults
	useEffect(() => {
		if (open) {
			form.reset({
				endpoint: defaultValues?.endpoint || "",
				method: defaultValues?.method || "GET",
				body: defaultValues?.body || "",
			});
		}
	}, [open, form, defaultValues]);

	const watchMethod = form.watch("method");
	const isShowingBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod);

	function handleSubmit(values: THttpRequestNodeSettingsFormValues) {
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
					<DialogTitle>HTTP Request</DialogTitle>
					<DialogDescription>
						Configure settings for the HTTP Request node.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8 mt-4"
					>
						{/* METHOD */}
						<FormField
							control={form.control}
							name="method"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="method">Method</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												id="method"
												className="w-full"
											>
												<SelectValue placeholder="Select a method" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="GET">GET</SelectItem>
											<SelectItem value="POST">POST</SelectItem>
											<SelectItem value="PUT">PUT</SelectItem>
											<SelectItem value="PATCH">PATCH</SelectItem>
											<SelectItem value="DELETE">DELETE</SelectItem>
										</SelectContent>
									</Select>

									<FormDescription>
										The HTTP method to use for this request.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* ENDPOINT */}
						<FormField
							control={form.control}
							name="endpoint"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="endpoint">Endpoint URL</FormLabel>

									<FormControl>
										<Input
											id="endpoint"
											placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
											required
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Static URL or use {"{{variables}}"} for simple values or{" "}
										{"{{json variable}}"} to stringify objects.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* BODY */}
						{isShowingBodyField && (
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="body">Request Body</FormLabel>

										<FormControl>
											<Textarea
												id="body"
												placeholder={
													'{\n "userId": "{{httpResponse.data.id}}",\n "name": "{{httpResponse.data.name}}",\n "items": "{{httpResponse.data.items}}"\n}'
												}
												className="min-h-[120px] font-mono text-sm"
												{...field}
											/>
										</FormControl>

										<FormDescription>
											JSON with template variables. Use {"{{variables}}"} for
											simple values or {"{{json variable}}"} to stringify
											objects.
										</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>
						)}

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
export default HttpRequestDialog;
