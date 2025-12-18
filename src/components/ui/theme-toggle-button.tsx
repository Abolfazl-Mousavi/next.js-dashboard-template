"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AnimationVariant = "circle" | "circle-blur" | "polygon"
type StartPosition =
	| "center"
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"

interface ModeToggleProps {
	className?: string
	variant?: AnimationVariant
	startPosition?: StartPosition
}

export function ModeToggle({
	className,
	variant = "circle-blur",
	startPosition = "top-right",
}: ModeToggleProps) {
	const { setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	// Prevent hydration mismatch
	React.useEffect(() => {
		setMounted(true)
	}, [])

	const toggleTheme = React.useCallback(() => {
		const isDark = resolvedTheme === "dark"
		const nextTheme = isDark ? "light" : "dark"

		// 1. Check if browser supports View Transitions
		if (
			!document.startViewTransition ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			setTheme(nextTheme)
			return
		}

		// 2. Inject the dynamic CSS for the specific animation variant
		const styleId = "theme-transition-style"
		let style = document.getElementById(styleId) as HTMLStyleElement

		if (!style) {
			style = document.createElement("style")
			style.id = styleId
			document.head.appendChild(style)
		}

		// Calculate CSS based on variant and position
		const css = getTransitionCss(variant, startPosition, isDark)
		style.textContent = css

		// 3. Trigger the transition
		document.startViewTransition(() => {
			setTheme(nextTheme)
		})

		// Cleanup logic is handled by the browser's view transition,
		// but we can optionally clear the style tag after a timeout if needed.
	}, [resolvedTheme, setTheme, variant, startPosition])

	if (!mounted) {
		return (
			<Button className={className} size="icon" variant="outline">
				<span className="sr-only">Toggle theme</span>
			</Button>
		)
	}

	return (
		<Button
			aria-label="Toggle theme"
			className={cn("relative overflow-hidden", className)}
			onClick={toggleTheme}
			size="icon"
			variant="outline"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}

// --- Helper: CSS Generator ---
function getTransitionCss(
	variant: AnimationVariant,
	start: StartPosition,
	isDarkNow: boolean, // true if we are currently dark, switching to light
) {
	const positions = {
		center: "center",
		"top-left": "top left",
		"top-right": "top right",
		"bottom-left": "bottom left",
		"bottom-right": "bottom right",
	}

	const transformOrigin = positions[start]

	// Coordinates for clip-path logic
	const x = start.includes("right")
		? "100%"
		: start.includes("left")
			? "0%"
			: "50%"
	const y = start.includes("bottom")
		? "100%"
		: start.includes("top")
			? "0%"
			: "50%"

	if (variant === "circle" || variant === "circle-blur") {
		const blurFilter = variant === "circle-blur" ? "filter: blur(4px);" : ""
		const blurReset = variant === "circle-blur" ? "filter: blur(0);" : ""

		return `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      ::view-transition-new(root) {
        animation: theme-circle 0.5s ease-in-out; 
        transform-origin: ${transformOrigin};
      }

      @keyframes theme-circle {
        from {
          clip-path: circle(0% at ${x} ${y});
          ${blurFilter}
        }
        to {
          clip-path: circle(150% at ${x} ${y});
          ${blurReset}
        }
      }
    `
	}

	if (variant === "polygon") {
		// Determine direction based on theme to make it feel like "wiping" on/off
		const nextThemeIsDark = !isDarkNow
		const animationName = nextThemeIsDark ? "wipe-in" : "wipe-out"

		return `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      ::view-transition-new(root) {
        animation: ${animationName} 0.5s cubic-bezier(0.25, 1, 0.5, 1);
      }

      @keyframes wipe-in {
        from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
        to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
      }
      
      @keyframes wipe-out {
         from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
         to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
      }
    `
	}

	return ""
}
