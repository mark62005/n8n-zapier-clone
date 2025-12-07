"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema, TSignInFormValues } from "./SignInFormSchema";

const SIGN_IN_FORM_DEFAULT_VALUES: TSignInFormValues = {
	email: "",
	password: "",
};

/**
 * Render a sign-in form UI with GitHub/Google buttons and email/password fields.
 *
 * Handles form validation and submission to the authentication client; on successful sign-in navigates to "/", and on error displays a toast message.
 *
 * @returns A JSX element containing the sign-in form
 */
function SignInForm() {
	const router = useRouter();
	const form = useForm<TSignInFormValues>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: SIGN_IN_FORM_DEFAULT_VALUES,
	});

	const isPending = form.formState.isSubmitting;

	async function onSignInSubmit(values: TSignInFormValues) {
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					router.push("/");
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			}
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle>Welcome back</CardTitle>

					<CardDescription>Login to continue</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSignInSubmit)}>
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									{/* SIGN IN WITH GITHUB BUTTON */}
									<Button
										variant="outline"
										type="button"
										disabled={isPending}
										className="w-full"
									>
										Continue with GitHub
									</Button>

									{/* SIGN IN WITH GOOGLE BUTTON */}
									<Button
										variant="outline"
										type="button"
										disabled={isPending}
										className="w-full"
									>
										Continue with Google
									</Button>
								</div>

								<div className="grid gap-6">
									{/* EMAIL INPUT */}
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>

												<FormControl>
													<Input
														type="email"
														placeholder="mail@example.com"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									{/* PASSWORD INPUT */}
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>

												<FormControl>
													<Input
														type="password"
														placeholder="********"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

									{/* SIGN IN BUTTON */}
									<Button
										type="submit"
										disabled={isPending}
										className="w-full"
									>
										Sign In
									</Button>

									<span className="text-center text-sm">
										Don&apos;t have an account?{" "}
										<Link
											href="/sign-up"
											className="underline underline-offset-4 hover:opacity-80 hover:underline-offset-6"
										>
											Sign up
										</Link>
										.
									</span>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
export default SignInForm;