import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Link
					href="/landing"
					className="flex mb-6 justify-center items-center gap-2 self-center font-medium"
				>
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</Link>
				<SignupForm />
			</div>
		</div>
	);
}
