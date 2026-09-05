import { Hono } from 'hono'

import { AuthHandlers } from '../handlers/auth'
import { CourseHandlers } from '../handlers/course'
import { LiveSessionHandlers } from '../handlers/live-session'
import { RoleHandlers } from '../handlers/role'
import { UserHandlers } from '../handlers/user'
import { ZoomHandlers } from '../handlers/zoom'

const v1Route = new Hono()

v1Route.route('/auth', AuthHandlers)

v1Route.route('/courses', CourseHandlers)
v1Route.route('/live-sessions', LiveSessionHandlers)
v1Route.route('/roles', RoleHandlers)
v1Route.route('/users', UserHandlers)

v1Route.route('/zoom', ZoomHandlers)

export default v1Route
