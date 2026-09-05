import { env } from '~/config/env'

const LOCAL_ORIGINS = ['http://localhost:3000']
const INTERNAL_ORIGINS = [
  'https://house-of-wizard.xyz',
  'https://app.house-of-wizard.xyz',
  'https://admin.house-of-wizard.xyz',
]

let ALLOWED_ORIGINS = [...INTERNAL_ORIGINS]

if (env.app.nodeEnv !== 'production') {
  ALLOWED_ORIGINS = [...ALLOWED_ORIGINS, ...LOCAL_ORIGINS]
}

const corsOptions = {
  origin: ALLOWED_ORIGINS,
}

export default corsOptions
