import { Users } from '../../users/entities/user.entity';
import { DateAudit } from '../../shared/entity/date-audit.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Reservations extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'reservations_users',
    joinColumn: {
      name: 'reservation',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  users: Users[];

  @Column()
  departure: string;

  @Column({ nullable: true })
  stopover: string;

  @Column()
  destination: string;

  @Column()
  people: number;

  @Column()
  accompany: string;

  @Column()
  price: number;

  @Column()
  status: string;
}
