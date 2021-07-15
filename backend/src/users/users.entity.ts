import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
  getRepository,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Rooms as Room } from '@rooms/rooms.entity';
import { Notices as Notice } from '@notices/notices.entity';
import { Reservations as Reservation } from '@reservations/reservations.entity';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { Messages } from '../messages/messages.entity';
import { DateAudit } from '../shared/entities/date-audit.entity';
import { ReservationsUsers as ReservatonsUser } from '../reservations_users/reservations_users.entity';

export enum UserType {
  NORMAL = 'normal',
  DRIVER = 'driver',
  COMPANY = 'company',
}

@Entity()
@Unique(['email'])
export class Users extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  registration_confirmed: boolean;

  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude() // serialization 제외
  password: string;

  @Column()
  @Exclude()
  encrypted_password: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ nullable: true })
  profile_img: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.NORMAL,
  })
  user_type: UserType;

  @Column({ nullable: true })
  uuid: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  drivable_date: string[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  drivable_legion: string[];

  @Column({ nullable: true })
  basic_km: number;

  @Column({ nullable: true })
  basic_charge: number;

  @Column({ nullable: true })
  charge_per_km: number;

  @Column({ nullable: true })
  service_charge: number;

  @Column({ nullable: true })
  night_begin: number;

  @Column({ nullable: true })
  night_end: number;

  @Column({ nullable: true })
  night_charge: number;

  @Column({ nullable: true })
  bus_type: string;

  @Column({ nullable: true })
  bus_old: number;

  @Column({ nullable: true })
  people_available: number;

  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  bus_number: string;

  @Column({ nullable: true })
  introduce: string;

  @Column({ nullable: true })
  charge_per_day: string;

  @OneToMany((type) => Messages, (message) => message.user)
  messages: Messages[];

  @OneToMany(
    (type) => ReservatonsUser,
    (reservationsUsers) => reservationsUsers.user,
  )
  reservationsUsers: ReservatonsUser[];

  @OneToMany((type) => Reservation, (reservations) => reservations.user)
  reservations: Reservation[];

  @OneToMany(
    (type) => Reservation,
    (drivingReservations) => drivingReservations.driver,
  )
  drivingReservations: Reservation[];

  @ManyToMany(() => Room)
  rooms: Room[];

  @PolymorphicChildren(() => Notice, { eager: false })
  notices: Notice[];

  async validateUserPassword(password: string): Promise<boolean> {
    // const hash = await bcrypt.hash(password, this.encrypted_password);
    const compareValue = bcrypt.compare(password, this.encrypted_password);
    return compareValue;
    // return hash === this.password;
  }

  static async sample(): Promise<Users> {
    const user = await getRepository(Users)
      .createQueryBuilder('users')
      .orderBy('RANDOM()')
      .getOne();
    return user;
  }
}
