"use client";

import {
	type TCredentialFormValues,
	type ICredentialFormProps,
} from "@/types/app/components/forms/credential-form";

import { CredentialType } from "@/generated/prisma/enums";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useCreateCredential,
	useUpdateCredential,
	useSuspenseCredentialById,
} from "@/hooks/use-credentials";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { credentialFormSchema } from "./CredentialFormSchema";

import Image from "next/image";
import Link from "next/link";
import {
	Form,
	FormControl,
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CREDENTIAL_TYPE_OPTIONS_CONFIG: {
	value: CredentialType;
	label: string;
	logoSrc: string;
}[] = [
	{
		value: CredentialType.OPENAI,
		label: "OpenAI",
		logoSrc: "/logos/openai.svg",
	},
	{
		value: CredentialType.GEMINI,
		label: "Gemini",
		logoSrc: "/logos/gemini.svg",
	},
	{
		value: CredentialType.ANTHROPIC,
		label: "Anthropic",
		logoSrc: "/logos/anthropic.svg",
	},
];

function CredentialForm({ initialData }: ICredentialFormProps) {
	const router = useRouter();
	const params = useParams();
	const createCredential = useCreateCredential();
	const updateCredential = useUpdateCredential();
	const { upgradeModal, handleError } = useUpgradeModal();

	const isEdit = !!initialData?.id;
	const isFormSubmitButtonDisabled =
		createCredential.isPending || updateCredential.isPending;

	const form = useForm<TCredentialFormValues>({
		resolver: zodResolver(credentialFormSchema),
		defaultValues: initialData || {
			name: "",
			type: CredentialType.OPENAI,
			value: "",
		},
	});

	async function handleFormSubmit(values: TCredentialFormValues) {
		if (isEdit && initialData && initialData?.id) {
			await updateCredential.mutateAsync({
				id: initialData.id,
				...values,
			});
		} else {
			await createCredential.mutateAsync(values, {
				onSuccess: () => {
					router.push("/credentials");
				},
				onError: (error) => {
					handleError(error);
				},
			});
		}
	}

	return (
		<Card className="shadow-none">
			<CardHeader>
				<CardTitle>{isEdit ? "Edit" : "Create"} Credential</CardTitle>

				<CardDescription>
					{isEdit
						? "Update your API key or credential details."
						: "Add a new API key or credential to your account."}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="space-y-6"
					>
						{/* NAME */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="name">Name</FormLabel>

									<FormControl>
										<Input
											id="name"
											placeholder="My API key"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* TYPE */}
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="type">Name</FormLabel>

									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger
												id="type"
												className="w-full"
											>
												<SelectValue placeholder="Select a type" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{CREDENTIAL_TYPE_OPTIONS_CONFIG.map((typeOption) => {
												const { value, label, logoSrc } = typeOption;

												return (
													<SelectItem
														key={value}
														value={value}
													>
														<div className="flex items-center gap-2">
															<Image
																src={logoSrc}
																alt={`Logo of ${label}`}
																width={16}
																height={16}
															/>

															{label}
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

						{/* VALUE */}
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="value">API Key</FormLabel>

									<FormControl>
										<Input
											id="value"
											type="password"
											placeholder="sk-..."
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex gap-4">
							{/* SUBMIT BUTTON */}
							<Button
								type="submit"
								disabled={isFormSubmitButtonDisabled}
							>
								{isEdit ? "Update" : "Create"}
							</Button>

							{/* CANCEL BUTTON */}
							<Button
								type="button"
								variant="outline"
								asChild
							>
								<Link
									href="/credentials"
									prefetch
								>
									Cancel
								</Link>
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
export default CredentialForm;
