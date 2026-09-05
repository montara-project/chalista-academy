import { AppDataSource } from '~/config/database'
import { Course } from '~/database/entities/courses'

import BaseRepository from './base'

export default class CoursesRepository extends BaseRepository<Course> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(Course),
      model: 'courses',
    })
  }
}
