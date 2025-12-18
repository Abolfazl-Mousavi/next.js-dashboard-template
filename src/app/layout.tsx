import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

import type { Metadata } from "next"
import { Geist } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
export const metadata: Metadata = {
	title: "NextJs Dashboard Template",
	description: "A better starter point for creating your dashboard with NextJS",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
})

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
