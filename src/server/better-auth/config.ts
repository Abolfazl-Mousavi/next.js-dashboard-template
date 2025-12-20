import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { env } from "@/env"
import { db } from "@/server/drizzle"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60, // 1 minute
		},
	},
	plugins: [nextCookies()],
	emailAndPassword: {
		requireEmailVerification: true,
		enabled: true,
		autoSignIn: false,
	},
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID as string,
			clientSecret: env.GITHUB_CLIENT_SECRET as string,
		},
	},
})

export type Session = typeof auth.$Infer.Session
