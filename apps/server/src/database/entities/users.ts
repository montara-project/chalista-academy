import argon2 from 'argon2'
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  type Relation,
} from 'typeorm'

import { Base } from './base'
import { Role } from './roles'
import { Session } from './sessions'

@Entity({ name: 'users' })
export class User extends Base {
  @Index()
  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date

  @Index()
  @Column()
  first_name: string

  @Index()
  @Column({ nullable: true })
  last_name!: string | null

  @Index()
  @Column()
  email: string

  @Index()
  @Column({ select: false })
  password: string

  @Column({ select: false, type: 'text', nullable: true })
  token_verify!: string

  @Index()
  @Column({ type: 'boolean', default: false })
  is_active: boolean

  @Index()
  @Column({ type: 'boolean', default: false })
  is_blocked: boolean

  @ManyToOne(() => Role, (role) => role)
  @JoinColumn({ name: 'role_id' })
  role: Relation<Role>

  @Index()
  @Column({ type: 'uuid' })
  role_id: string

  @OneToMany(() => Session, (session) => session.user)
  @JoinTable()
  sessions: Relation<Session>[]

  async comparePassword(current_password: string): Promise<boolean> {
    return await argon2.verify(this.password, current_password)
  }
}
