import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users as User } from '@users/users.entity';
import { DateAudit } from '@entities/date-audit.entity';
import { Schedules as Schedule } from '@schedules/schedules.entity';

@Entity()
export class Reservations extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  people: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  total_price: number;

  @Column({ nullable: true })
  total_distance: number;

  @Column({ nullable: true })
  departureDate: string;

  @Column({ nullable: true })
  departureTime: string;

  @Column({ nullable: true })
  returnDate: string;

  @Column({ nullable: true })
  returnTime: string;

  @ManyToOne((type) => User, (user) => user.reservations)
  user: User;

  @ManyToOne((type) => User, (driver) => driver.reservations)
  driver: User;

  @OneToMany((type) => Schedule, (schedules) => schedules.reservation, {
    nullable: true,
  })
  schedules: Schedule[];
}
