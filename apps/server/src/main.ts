import { serve } from "@hono/node-server"

import app from "./app/routes"
import { env } from "./config/env"

function main () {
  // start server
  serve({ fetch: app.fetch, port: env.app.port }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  })
}

main()
