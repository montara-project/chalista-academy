import { AppDataSource } from '~/config/database'
import { CourseModule } from '~/database/entities/course-modules'

import BaseRepository from './base'

export default class CourseModulesRepository extends BaseRepository<CourseModule> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(CourseModule),
      model: 'course_modules',
    })
  }
}
