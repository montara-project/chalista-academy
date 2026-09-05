import { Column, DeleteDateColumn, Entity, Index } from 'typeorm'

import { Base } from './base'

export const LIVE_SESSION_STATUSES = ['scheduled', 'live', 'completed', 'cancelled'] as const
export type LiveSessionStatus = (typeof LIVE_SESSION_STATUSES)[number]

@Entity({ name: 'live_sessions' })
export class LiveSession extends Base {
  @Index()
  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date

  @Index()
  @Column({ type: 'uuid' })
  course_id: string

  @Index()
  @Column()
  title: string

  @Index()
  @Column({ type: 'timestamptz' })
  starts_at: Date

  @Column({ type: 'int' })
  duration_minutes: number

  @Index({ unique: true })
  @Column()
  meeting_number: string

  @Column()
  passcode: string

  @Index()
  @Column({ type: 'enum', enum: LIVE_SESSION_STATUSES, default: 'scheduled' })
  status: LiveSessionStatus
}
