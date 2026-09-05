
import { ZoomSignatureRequestSchema } from '@chalista/types'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import { env } from '~/config/env'
import HttpResponse from '~/lib/http/response'

import { services } from '../services'

const route = new Hono()

route.post('/signature', zValidator('json', ZoomSignatureRequestSchema), async (c) => {
  const values = c.req.valid('json')

  const signature = await services.zoom.createMeetingSignature({
    sdkKey: env.zoom.key,
    sdkSecret: env.zoom.secret,
    meetingNumber: values.meetingNumber,
    expirationSeconds: values.expirationSeconds,
    role: values.role,
  })

  const response = HttpResponse.created({
    data: { signature, key: env.zoom.key, meetingNumber: values.meetingNumber },
  })
  return c.json(response, 201)
})

export { route as ZoomHandlers }
