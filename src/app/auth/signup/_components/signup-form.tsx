"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const SignupSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters."),
		email: z.email("Please enter a valid email address."),
		password: z.string().min(8, "Password must be at least 8 characters."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type SignupFormValues = z.infer<typeof SignupSchema>;

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { push } = useRouter();

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: SignupFormValues) {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					toast.success("Account created successfully!");
					push("/auth/verify");
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>
						Enter your details below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							{/* Full Name Field */}
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
										<Input
											{...field}
											id={field.name}
											placeholder="John Doe"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* Email Field */}
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											{...field}
											id={field.name}
											type="email"
											placeholder="m@example.com"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* Password Grid */}
							<div className="grid grid-cols-2 gap-4">
								<Controller
									name="password"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<Input
												{...field}
												id={field.name}
												type="password"
												aria-invalid={fieldState.invalid}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									name="confirmPassword"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor={field.name}>Confirm</FieldLabel>
											<Input
												{...field}
												id={field.name}
												type="password"
												aria-invalid={fieldState.invalid}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>

							<Field>
								<Button
									type="submit"
									className="w-full"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting
										? "Creating account..."
										: "Create Account"}
								</Button>
								<FieldDescription className="text-center">
									Already have an account?{" "}
									<Link
										href="/auth/login"
										className="underline underline-offset-4"
									>
										Sign in
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our{" "}
				<Link href="/terms-of-service" className="underline underline-offset-4">
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link href="/privacy-policy" className="underline underline-offset-4">
					Privacy Policy
				</Link>
				.
			</FieldDescription>
		</div>
	);
}
