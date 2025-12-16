import { defineConfig } from "cypress";
import { env } from "@/env";

export default defineConfig({
	e2e: {
		setupNodeEvents(_on, _config) {},
		baseUrl: env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
		supportFile: false,
		viewportWidth: 1280,
		viewportHeight: 800,
		video: false,
	},
});
