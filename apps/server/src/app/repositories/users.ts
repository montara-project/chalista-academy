import { AppDataSource } from '~/config/database'
import { User } from '~/database/entities/users'

import BaseRepository from './base'

export default class UsersRepository extends BaseRepository<User> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(User),
      model: 'users',
    })
  }
}
