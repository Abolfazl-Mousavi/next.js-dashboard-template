import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { env } from "@/env"
import * as schema from "./schema"

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	max: 10,
})

const loggerFlag: boolean = env.NODE_ENV !== "production"

export const db = drizzle({ client: pool, logger: loggerFlag, schema })
