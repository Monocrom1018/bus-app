import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from '@users/users.entity';
import { DateAudit } from '@entities/date-audit.entity';
import { Schedules } from '@schedules/schedules.entity';

@Entity()
export class Reservations extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departure: string;

  @Column()
  departureDate: Date;

  @Column()
  destination: string;

  @Column()
  returnDate: Date;

  @Column()
  people: number;

  @Column()
  price: number;

  @Column()
  status: string;

  @OneToMany((type) => Schedules, (Schedules) => Schedules.reservation)
  schedules: Schedules[];

  @ManyToOne((type) => Users, (user) => user.reservations)
  user: Users;

  @ManyToOne((type) => Users, (driver) => driver.reservations)
  driver: Users;
}
