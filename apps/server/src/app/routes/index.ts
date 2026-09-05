import { serveStatic } from '@hono/node-server/serve-static'
import { sentry } from '@sentry/hono/node'
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'

import corsOptions from '~/lib/constants/cors'
import ErrorResponse from '~/lib/http/errors'
import { errorHandler } from '~/middlewares/error-handler'
import { rateLimiter } from '~/middlewares/rate-limiter'
import { userAgent } from '~/middlewares/user-agent'

import { HomeRoute } from './home'
import v1Route from './v1'

const DEFAULT_BODY_LIMIT = 1024 * 1024 // 1MB

const app = new Hono()

app.use(logger())
app.use(compress())
app.use(requestId())
app.use(bodyLimit({ maxSize: DEFAULT_BODY_LIMIT }))
app.use(cors(corsOptions))
app.use(rateLimiter())
app.use(userAgent())
app.use(sentry(app))

app.use('/static/*', serveStatic({ root: './public' }))

app.route('/', HomeRoute)
app.route('/v1', v1Route)

app.notFound((c) => {
  throw new ErrorResponse.NotFound(`Endpoint ${c.req.method} ${c.req.path} not found`)
})

app.onError(errorHandler)

export default app
