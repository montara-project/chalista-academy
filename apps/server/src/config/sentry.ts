import * as Sentry from '@sentry/hono/node'

import { env } from './env'

export function SentryConfig() {
  return Sentry.init({
    dsn: env.sentryDsn,
    dataCollection: {
      // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/hono/configuration/options/#dataCollection
      // userInfo: false,
      // httpBodies: [],
    },
  })
}
