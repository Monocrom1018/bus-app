import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Messages } from '@messages/messages.entity';
import { Users } from '@users/users.entity';
import { DateAudit } from '@entities/date-audit.entity';

@Entity()
export class Rooms extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  // 이렇게 하면 자동으로 중간테이블 생성?
  @ManyToMany(() => Users)
  @JoinTable({
    name: 'rooms_users',
    joinColumn: {
      name: 'room',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  users: Users[];

  @OneToMany((type) => Messages, (message) => message.room)
  messages: Messages[];
}
