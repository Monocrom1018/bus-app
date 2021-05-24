import { DateAudit } from '../../shared/entity/date-audit.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Reservations_users } from '../../reservations_users/entities/reservations_users.entity';

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
    (type) => Reservations_users,
    (reservations_users) => reservations_users.reservation,
  )
  reservations_users: Reservations_users[];

  @Column()
  departure: string;

  @Column()
  departureDate: Date;

  @Column({ nullable: true })
  stopover: string;

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
}
