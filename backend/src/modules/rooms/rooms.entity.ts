import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { MessagesEntity } from '@messages/messages.entity';
import { UsersEntity } from '@users/users.entity';
import { DateAuditEntity } from '@entities/date-audit.entity';

@Entity('rooms')
export class RoomsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  // 이렇게 하면 자동으로 중간테이블 생성?
  @ManyToMany(() => UsersEntity)
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
  users: UsersEntity[];

  @OneToMany((type) => MessagesEntity, (message) => message.room)
  messages: MessagesEntity[];
}
