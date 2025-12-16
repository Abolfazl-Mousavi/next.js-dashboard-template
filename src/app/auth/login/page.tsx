import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { FieldDescription } from "@/components/ui/field";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col items-center gap-2 text-center">
					<Link
						href="/landing"
						className="flex flex-col items-center gap-2 font-medium"
					>
						<div className="flex size-8 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-6" />
						</div>
						<span className="sr-only">Acme Inc.</span>
					</Link>
					<h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
					<FieldDescription>
						Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
					</FieldDescription>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
