"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Github, Instagram, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { authClient } from "@/server/better-auth/auth-client"

const LoginSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
})

type LoginFormValues = z.infer<typeof LoginSchema>

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { push } = useRouter()

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})
	const isPending = form.formState.isSubmitting

	async function onSubmit(values: LoginFormValues) {
		await authClient.signIn.email(
			{
				...values,
				rememberMe: true,
				callbackURL: "/",
			},
			{
				onError: (error) => {
					if (error.error.code === "EMAIL_NOT_VERIFIED") {
						push("/auth/verify")
					}
					toast.error(error.error.message)
				},
				onSuccess: () => {
					toast.success("Welcome back!")
				},
			},
		)
	}
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						control={form.control}
						name="email"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									autoComplete="email"
									id={field.name}
									placeholder="m@example.com"
									type="email"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						control={form.control}
						name="password"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<div className="flex items-center justify-between">
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<Link
										className="text-sm underline underline-offset-4 hover:text-primary"
										href="/auth/forgot-password"
									>
										Forgot password?
									</Link>
								</div>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									autoComplete="current-password"
									id={field.name}
									type="password"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Field>
						<Button disabled={isPending} type="submit">
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								"Login"
							)}
						</Button>
					</Field>
					<FieldSeparator>Or</FieldSeparator>
					<Field className="grid gap-4 sm:grid-cols-2">
						<Button
							disabled={isPending}
							onClick={() => {
								authClient.signIn.social({
									provider: "github",
									callbackURL: "/",
								})
							}}
							type="button"
							variant="outline"
						>
							<Github />
							Continue with Github
						</Button>

						<Button disabled type="button" variant="outline">
							<Instagram />
							Continue with Meta
						</Button>
					</Field>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center text-xs text-muted-foreground">
				By clicking continue, you agree to our{" "}
				<Link className="underline underline-offset-4" href="/terms-of-service">
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link className="underline underline-offset-4" href="/privacy-policy">
					Privacy Policy
				</Link>
				.
			</FieldDescription>
		</div>
	)
}
