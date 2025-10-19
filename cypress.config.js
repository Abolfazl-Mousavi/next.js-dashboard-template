import { env } from "@/env";
import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {},
		baseUrl: env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
		supportFile: false,
		viewportWidth: 1280,
		viewportHeight: 800,
		video: false,
	},
});
