import type { Context } from 'hono'

import { getConnInfo } from '@hono/node-server/conninfo'
import { UAParser } from 'ua-parser-js'

export function userAgent() {
  return async (c: Context, next: () => Promise<void>) => {
    const uaString = c.req.header('User-Agent') || ''
    const parser = new UAParser(uaString)
    const info = getConnInfo(c)

    const userAgent = {
      browser: parser.getBrowser().name || 'N/A',
      os: parser.getOS().name || 'N/A',
      device: parser.getDevice().type || 'desktop',
      userAgent: uaString,
      ipAddress:
        info.remote.address ||
        c.req.header('x-forwarded-for') ||
        c.req.header('cf-connecting-ip') ||
        'N/A',
    }

    c.set('userAgent', userAgent)

    await next()
  }
}
