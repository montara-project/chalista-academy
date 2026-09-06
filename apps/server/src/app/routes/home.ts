import { Hono } from 'hono'

import HttpResponse from '~/lib/http/response'

const route = new Hono()

route.get('/', (c) => {
  const response = HttpResponse.get({ message: 'Hono API' })
  return c.json(response)
})

route.get('/health', (c) => {
  const response = HttpResponse.get({ status: 'OK', userAgent: c.get('userAgent') })
  return c.json(response)
})

route.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

export { route as HomeRoute }
