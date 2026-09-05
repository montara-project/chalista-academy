import { Column, Entity, Index, JoinColumn, ManyToOne, type Relation } from 'typeorm'

import { Base } from './base'
import { CourseModule } from './course-modules'

@Entity({ name: 'lessons' })
export class Lesson extends Base {
  @Index()
  @Column()
  title: string

  @Column({ type: 'int' })
  duration_minutes: number

  @ManyToOne(() => CourseModule, (courseModule) => courseModule.lessons)
  @JoinColumn({ name: 'module_id' })
  module: Relation<CourseModule>

  @Index()
  @Column({ type: 'uuid' })
  module_id: string
}
