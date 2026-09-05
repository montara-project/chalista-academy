import { BaseGetParamSchema, LiveSessionFormSchema, PaginationQuerySchema } from '@chalista/types'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import HttpResponse from '~/lib/http/response'

import LiveSessionsRepository from '../repositories/live-sessions'

const route = new Hono()
const repository = new LiveSessionsRepository()

route.get('/', zValidator('query', PaginationQuerySchema), async (c) => {
  const { offset, limit } = c.req.valid('query')
  const records = await repository.find({ offset, limit })

  const response = HttpResponse.get({
    data: records.data,
    metadata: { offset, limit, total: records.total },
  })

  return c.json(response, 200)
})

route.get(
  '/:id',
  zValidator('param', BaseGetParamSchema, (result, c) => {
    if (!result.success) {
      const response = HttpResponse.throwGetByID({ issues: result.error.issues })
      return c.json(response, 400)
    }
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const record = await repository.findById(id)

    const response = HttpResponse.get({ data: record })
    return c.json(response, 200)
  }
)

route.post('/', zValidator('json', LiveSessionFormSchema), async (c) => {
  const values = c.req.valid('json')
  const record = await repository.create(values)

  const response = HttpResponse.created({ data: record })
  return c.json(response, 201)
})

route.put(
  '/:id',
  zValidator('param', BaseGetParamSchema, (result, c) => {
    if (!result.success) {
      const response = HttpResponse.throwGetByID({ issues: result.error.issues })
      return c.json(response, 400)
    }
  }),
  zValidator('json', LiveSessionFormSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const values = c.req.valid('json')
    const record = await repository.update(id, values)

    const response = HttpResponse.updated({ data: record })
    return c.json(response, 200)
  }
)

route.put(
  '/restore/:id',
  zValidator('param', BaseGetParamSchema, (result, c) => {
    if (!result.success) {
      const response = HttpResponse.throwGetByID({ issues: result.error.issues })
      return c.json(response, 400)
    }
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    await repository.restore(id)

    const response = HttpResponse.restored()
    return c.json(response, 200)
  }
)

route.delete(
  '/soft-delete/:id',
  zValidator('param', BaseGetParamSchema, (result, c) => {
    if (!result.success) {
      const response = HttpResponse.throwGetByID({ issues: result.error.issues })
      return c.json(response, 400)
    }
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    await repository.softDelete(id)

    const response = HttpResponse.deleted()
    return c.json(response, 200)
  }
)

route.delete(
  '/force-delete/:id',
  zValidator('param', BaseGetParamSchema, (result, c) => {
    if (!result.success) {
      const response = HttpResponse.throwGetByID({ issues: result.error.issues })
      return c.json(response, 400)
    }
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    await repository.forceDelete(id)

    const response = HttpResponse.deleted()
    return c.json(response, 200)
  }
)

export { route as LiveSessionHandlers }
