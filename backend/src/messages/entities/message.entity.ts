import { Users } from '../../users/entities/user.entity';
import { Rooms } from '../../rooms/entities/room.entity';

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { DateAudit } from '../../shared/entity/date-audit.entity';

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
