"use client";
import { Github, Instagram } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</Field>
					<Field>
						<Button type="submit">Login</Button>
					</Field>
					<FieldSeparator>Or</FieldSeparator>
					<Field className="grid gap-4 sm:grid-cols-2">
						<Button
							onClick={() => {
								authClient.signIn.social({
									provider: "github",
									callbackURL: "/",
								});
							}}
							variant="outline"
							type="button"
						>
							<Github />
							Continue with Github
						</Button>
						<Button disabled variant="outline" type="button">
							<Instagram />
							Continue with Meta
						</Button>
					</Field>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our{" "}
				<Link href="/terms-of-service">Terms of Service</Link> and{" "}
				<Link href="/privacy-policy">Privacy Policy</Link>.
			</FieldDescription>
		</div>
	);
}
