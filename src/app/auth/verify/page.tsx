"use client"

import { Mail } from "lucide-react"
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty"
import { ResendEmailButton } from "./_components/resend-email-button"

export default function VerifyEmailPage() {
	return (
		<Empty className="h-screen">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Mail />
				</EmptyMedia>
				<EmptyTitle>Verify your email</EmptyTitle>
				<EmptyDescription>
					We've sent a verification link to your email address. Please click the
					link in the email to continue.
				</EmptyDescription>

				<div className="mt-6">
					<p className="text-sm text-muted-foreground mb-2">
						Didn't receive the email?
					</p>
					<ResendEmailButton />
				</div>
			</EmptyHeader>
		</Empty>
	)
}
