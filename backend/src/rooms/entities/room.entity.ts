import { Users } from '../../users/entities/user.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { DateAudit } from '../../shared/entity/date-audit.entity';

@Entity()
export class Rooms extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  // 이렇게 하면 자동으로 중간테이블 생성?
  @ManyToMany(() => Users)
  @JoinTable()
  users: Users[];
}
