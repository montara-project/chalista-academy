import { Column, DeleteDateColumn, Entity, Index, OneToMany, type Relation } from 'typeorm'

import { Base } from './base'
import { CourseModule } from './course-modules'

export const COURSE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type CourseLevel = (typeof COURSE_LEVELS)[number]

@Entity({ name: 'courses' })
export class Course extends Base {
  @Index()
  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date

  @Index({ unique: true })
  @Column()
  slug: string

  @Index()
  @Column()
  title: string

  @Column({ type: 'text' })
  description: string

  @Index()
  @Column()
  instructor: string

  @Index()
  @Column({ type: 'enum', enum: COURSE_LEVELS })
  level: CourseLevel

  @Index()
  @Column({ type: 'boolean', default: false })
  published: boolean

  @OneToMany(() => CourseModule, (courseModule) => courseModule.course)
  modules: Relation<CourseModule[]>
}
