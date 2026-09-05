import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, type Relation } from 'typeorm'

import { Base } from './base'
import { Course } from './courses'
import { Lesson } from './lessons'

@Entity({ name: 'course_modules' })
export class CourseModule extends Base {
  @Index()
  @Column()
  title: string

  @ManyToOne(() => Course, (course) => course.modules)
  @JoinColumn({ name: 'course_id' })
  course: Relation<Course>

  @Index()
  @Column({ type: 'uuid' })
  course_id: string

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Relation<Lesson[]>
}
