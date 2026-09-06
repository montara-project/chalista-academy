import { serve } from "@hono/node-server"

import app from "./app/routes"
import { initializeDatabase } from "./config/database"
import { env } from "./config/env"
import { SentryConfig } from "./config/sentry"

async function main () {
  SentryConfig()

  // initialize database
  await initializeDatabase()

  // start server
  serve({ fetch: app.fetch, port: env.app.port }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  })
}

main()
