import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from '@users/users.entity';
import { RoomsEntity } from '@rooms/rooms.entity';

import { DateAuditEntity } from '@entities/date-audit.entity';

@Entity('messages')
export class MessagesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne((type) => UsersEntity, (user) => user.messages)
  user: UsersEntity;

  @ManyToOne((type) => RoomsEntity, (room) => room.messages)
  room: RoomsEntity;
}
