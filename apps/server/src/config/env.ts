import '@dotenvx/dotenvx/config'
import z from 'zod'

export const ConfigSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test', 'staging']),
    MACHINE_ID: z.string(),
    DEBUG: z.coerce.boolean().default(false),
    PORT: z.coerce.number().int().default(8000),

    TYPEORM_CONNECTION: z.enum(['mysql', 'postgres', 'sqlite']),
    TYPEORM_HOST: z.string(),
    TYPEORM_PORT: z.coerce.number().int(),
    TYPEORM_USERNAME: z.string(),
    TYPEORM_PASSWORD: z.string(),
    TYPEORM_DATABASE: z.string(),
    TYPEORM_SYNCHRONIZE: z.coerce.boolean(),
    TYPEORM_LOGGING: z.coerce.boolean(),
    TYPEORM_MIGRATIONS_RUN: z.coerce.boolean(),
    TYPEORM_TIMEZONE: z.string(),

    JWT_SECRET: z.string(),
    ZOOM_SDK_KEY: z.string(),
    ZOOM_SDK_SECRET: z.string(),

    SENTRY_DSN: z.string().optional(),
  })
  .transform((val) => {
    return {
      app: {
        port: val.PORT,
        nodeEnv: val.NODE_ENV,
        debug: val.DEBUG,
        machineId: val.MACHINE_ID,
      },
      typeorm: {
        connection: val.TYPEORM_CONNECTION,
        host: val.TYPEORM_HOST,
        port: val.TYPEORM_PORT,
        username: val.TYPEORM_USERNAME,
        password: val.TYPEORM_PASSWORD,
        database: val.TYPEORM_DATABASE,
        synchronize: val.TYPEORM_SYNCHRONIZE,
        logging: val.TYPEORM_LOGGING,
        migrationsRun: val.TYPEORM_MIGRATIONS_RUN,
        timezone: val.TYPEORM_TIMEZONE,
      },
      jwt: {
        secret: val.JWT_SECRET,
      },
      zoom: {
        key: val.ZOOM_SDK_KEY,
        secret: val.ZOOM_SDK_SECRET,
      },
      sentryDsn: val.SENTRY_DSN,
    }
  })
  .readonly()

export type Config = z.infer<typeof ConfigSchema>
export type AppConfig = Config['app']
export type JwtConfig = Config['jwt']
export type TypeormConfig = Config['typeorm']
export type ZoomConfig = Config['zoom']

const parsed = ConfigSchema.safeParse(process.env)

if (!parsed.success) {
  console.log(parsed.error)
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
