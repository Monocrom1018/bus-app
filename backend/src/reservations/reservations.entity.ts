import { DateAudit } from '../shared/entities/date-audit.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ReservationsUsers as ReservationsUser } from '../reservations_users/reservations_users.entity';
import { Users } from '@users/users.entity';

@Entity()
export class Reservations extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  //? joinTable 써봤으나 seeding 시 factory에서 import 할 entity 가 없어 따로 entity 파는 방향으로 전환
  //? 이슈 해결할 수 있다면 joinTable 쓰는게 훨씬 깔끔

  // @ManyToMany(() => Users)
  // @JoinTable({
  //   name: 'reservations_users',
  //   joinColumn: {
  //     name: 'reservation',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'user',
  //     referencedColumnName: 'id',
  //   },
  // })
  // users: Users[];

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

  @Column({ nullable: true })
  lastDestination: string;

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
