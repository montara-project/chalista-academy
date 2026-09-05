import { SignInFormSchema } from '@chalista/types'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import _ from 'lodash'

import { AppDataSource } from '~/config/database'
import { env } from '~/config/env'
import { Role } from '~/database/entities/roles'
import { Session } from '~/database/entities/sessions'
import { User } from '~/database/entities/users'
import { JWT_CONSTANTS } from '~/lib/constants/jwt'
import ErrorResponse from '~/lib/http/errors'
import HttpResponse from '~/lib/http/response'
import JwtToken from '~/lib/jwt'
import { authorization } from '~/middlewares/authorization'

const route = new Hono()

route.post('/sign-in', zValidator('json', SignInFormSchema), async (c) => {
  const values = c.req.valid('json')

  let data: Record<string, unknown> = {}

  await AppDataSource.transaction(async (manager) => {
    const repo = {
      user: manager.getRepository(User),
      role: manager.getRepository(Role),
      session: manager.getRepository(Session),
    }

    const getUser = await repo.user.findOne({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        is_active: true,
        role_id: true,
      },
      where: { email: values.email },
    })

    if (!getUser) {
      throw new ErrorResponse.NotFound('user not found')
    }

    if (!getUser.is_active) {
      throw new ErrorResponse.BadRequest('user is not active, please verify your email')
    }

    const isPasswordMatch = await getUser.comparePassword(values.password)
    if (!isPasswordMatch) {
      throw new ErrorResponse.BadRequest('current password is incorrect')
    }

    const getRole = await repo.role.findOne({ where: { id: getUser.role_id } })
    if (!getRole) {
      throw new ErrorResponse.NotFound('role not found')
    }

    const jwt = new JwtToken({
      secret: env.jwt.secret,
      expires: JWT_CONSTANTS.DEFAULT_TOKEN_EXPIRES,
    })

    const payload = JSON.parse(JSON.stringify({ uid: getUser.id }))
    const { token, expiresIn } = jwt.generate(payload)

    // Session
    const sessionEntity = new Session()

    const session = await repo.session.save({
      ...sessionEntity,
      user_id: getUser.id,
      token,
      expires_at: new Date(Date.now() + expiresIn * 1000),
      expires_in: expiresIn,
    } as unknown as Session)

    data = {
      uid: getUser.id,
      display_name: `${getUser.first_name} ${getUser.last_name}`,
      email: getUser.email,
      access_token: token,
      id_token: session.id,
      expires_at: new Date(Date.now() + expiresIn * 1000),
      expires_in: expiresIn,
      role: getRole.name.toLowerCase(),
    }
  })

  const response = HttpResponse.get({ message: 'Sign In successfully', data })
  return c.json(response, 200)
})

route.get('/me', authorization(), async (c) => {
  const auth = c.get('auth')

  const repo = {
    user: AppDataSource.getRepository(User),
    session: AppDataSource.getRepository(Session),
  }

  const user = await repo.user.findOne({ where: { id: auth.userId } })
  if (!user) {
    throw new ErrorResponse.NotFound('user not found')
  }

  const session = await repo.session.findOne({ where: { user_id: user.id, token: auth.token } })
  if (!session) {
    throw new ErrorResponse.NotFound('session not found')
  }

  const jwt = new JwtToken({
    secret: env.jwt.secret,
    expires: JWT_CONSTANTS.DEFAULT_TOKEN_EXPIRES,
  })

  const decodeToken = jwt.verify(auth.token)
  const uid = (decodeToken.data as Record<string, string>).uid

  if (!_.isEmpty(uid) && uid !== user.id) {
    throw new ErrorResponse.BadRequest('user id not match')
  }

  const response = HttpResponse.get({ data: user })
  return c.json(response, 200)
})

export { route as AuthHandlers }
