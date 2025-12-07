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
import { signUpFormSchema, TSignUpFormValues } from "./SignUpFormSchema";

const SIGN_IN_FORM_DEFAULT_VALUES: TSignUpFormValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function SignInForm() {
	const router = useRouter();
	const form = useForm<TSignUpFormValues>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: SIGN_IN_FORM_DEFAULT_VALUES,
	});

	const isPending = form.formState.isSubmitting;

	async function onSignUpSubmit(values: TSignUpFormValues) {
		await authClient.signUp.email(
			{
				name: values.name,
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
					<CardTitle>Get started</CardTitle>

					<CardDescription>Create your account to get started</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSignUpSubmit)}>
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									{/* SIGN IN WITH GITHUB BUTTON */}
									<Button
										variant="outline"
										type="button"
										disabled={isPending}
										className="w-full"
									>
										<Image
											src="/logos/github.svg"
											alt="GitHub Logo"
											width={20}
											height={20}
										/>
										Continue with GitHub
									</Button>

									{/* SIGN IN WITH GOOGLE BUTTON */}
									<Button
										variant="outline"
										type="button"
										disabled={isPending}
										className="w-full"
									>
										<Image
											src="/logos/google.svg"
											alt="Google Logo"
											width={20}
											height={20}
										/>
										Continue with Google
									</Button>
								</div>

								<div className="grid gap-6">
									{/* NAME INPUT */}
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>

												<FormControl>
													<Input
														type="text"
														placeholder="Your name"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>

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

									{/* CONFIRM PASSWORD INPUT */}
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm Password</FormLabel>

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
										Sign Up
									</Button>

									<span className="text-center text-sm">
										Already have an account?{" "}
										<Link
											href="/sign-in"
											className="underline underline-offset-4 hover:opacity-80 hover:underline-offset-6"
										>
											Sign in
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
