import { AppDataSource } from '~/config/database'
import { LiveSession } from '~/database/entities/live-sessions'

import BaseRepository from './base'

export default class LiveSessionsRepository extends BaseRepository<LiveSession> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(LiveSession),
      model: 'live_sessions',
    })
  }
}
