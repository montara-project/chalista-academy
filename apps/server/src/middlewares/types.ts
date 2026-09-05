import type { Session } from '~/database/entities/sessions'

declare module 'hono' {
  interface ContextVariableMap {
    auth: {
      userId: string
      token: string
      session: Session
    }
    userAgent: {
      browser: string
      os: string
      device: string
      userAgent: string
      ipAddress: string
    }
  }
}
