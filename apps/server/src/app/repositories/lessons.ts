import { AppDataSource } from '~/config/database'
import { Lesson } from '~/database/entities/lessons'

import BaseRepository from './base'

export default class LessonsRepository extends BaseRepository<Lesson> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(Lesson),
      model: 'lessons',
    })
  }
}
