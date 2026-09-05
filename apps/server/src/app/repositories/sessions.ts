import { AppDataSource } from '~/config/database'
import { Session } from '~/database/entities/sessions'

import BaseRepository from './base'

export default class SessionsRepository extends BaseRepository<Session> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(Session),
      model: 'sessions',
    })
  }
}
