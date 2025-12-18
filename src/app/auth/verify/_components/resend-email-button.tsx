"use client"

import { RotateCw } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button" // Adjust path to your UI library

export function ResendEmailButton() {
	const [countdown, setCountdown] = useState(0)
	const [isPending, setIsPending] = useState(false)

	useEffect(() => {
		if (countdown <= 0) return

		const timer = setInterval(() => {
			setCountdown((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(timer)
	}, [countdown])

	const handleResend = async () => {
		setIsPending(true)

		try {
			// Replace with your actual API call
			// await fetch("/api/auth/resend-verification");

			// Start 60 second cooldown
			setCountdown(60)
		} catch (error) {
			console.error("Failed to resend:", error)
		} finally {
			setIsPending(false)
		}
	}

	return (
		<Button
			className="min-w-35"
			disabled={countdown > 0 || isPending}
			onClick={handleResend}
			variant="outline"
		>
			{isPending ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : null}

			{countdown > 0 ? `Resend in ${countdown}s` : "Resend email"}
		</Button>
	)
}
