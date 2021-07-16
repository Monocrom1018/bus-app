import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from '@users/users.entity';
import { DateAudit } from '@entities/date-audit.entity';
import { ReservationsUsers as ReservationsUser } from '@reservations_users/reservations_users.entity';

@Entity()
export class Reservations extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    (type) => ReservationsUser,
    (reservationsUsers) => reservationsUsers.reservation,
  )
  reservationsUsers: ReservationsUser[];

  @Column()
  departure: string;

  @Column()
  departureDate: Date;

  @Column('text', {
    array: true,
    nullable: true,
  })
  stopover: string[];

  @Column()
  destination: string;

  @Column()
  returnDate: Date;

  @Column()
  people: number;

  @Column()
  accompany: string;

  @Column()
  price: number;

  @Column()
  status: string;

  @ManyToOne((type) => Users, (user) => user.reservations)
  user: Users;

  @ManyToOne((type) => Users, (driver) => driver.reservations)
  driver: Users;
}
