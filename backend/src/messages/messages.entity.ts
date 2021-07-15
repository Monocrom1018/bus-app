import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entity';
import { Rooms } from '../rooms/rooms.entity';

import { DateAudit } from '../shared/entities/date-audit.entity';

@Entity()
export class Messages extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne((type) => Users, (user) => user.messages)
  user: Users;

  @ManyToOne((type) => Rooms, (room) => room.messages)
  room: Rooms;
}
