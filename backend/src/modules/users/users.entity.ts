import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
  getRepository,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { NoticesEntity } from '@notices/notices.entity';
import { ReservationsEntity } from '@reservations/reservations.entity';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { DateAuditEntity } from '@entities/date-audit.entity';
import { ImagesEntity } from '@images/images.entity';
import { FilesEntity } from '@files/files.entity';
import { UsersChatroomsEntity } from 'src/modules/users-chatrooms/user-chatrooms.entity';
import { BusesEntity } from '@buses/buses.entity';
import { UserType } from './enum';
import { ReviewsEntity } from '../reviews/reviews.entity';

@Entity('users')
@Unique(['email'])
export class UsersEntity extends DateAuditEntity {
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
  phone: string;

  @Column({ nullable: true })
  introduce: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.NORMAL,
  })
  user_type: UserType;

  @Column({ nullable: true })
  uuid: string;

  @Column({ nullable: true })
  term_check: boolean;

  @Column({ nullable: true })
  privacy_check: boolean;

  @Column({ nullable: true })
  marketing_check: boolean;

  @Column({ nullable: true })
  company_name: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  drivable_region: string[];

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
  charge_per_day: string;

  @Column({ nullable: true })
  peak_charge: number;

  @Column({ nullable: true })
  peak_charge_per_km: number;

  @Column({ nullable: true, default: false })
  card_registered: boolean;

  @Column({ nullable: true })
  card_billing_key: string;

  @Column({ nullable: true })
  card_number: string;

  @Column({ nullable: true })
  card_company: string;

  @Column({ nullable: true })
  director_name: string;

  @Column({ nullable: true })
  director_email: string;

  @Column({ nullable: true })
  director_phone: number;

  @Column({ nullable: true })
  bank: string;

  @Column({ nullable: true })
  bank_account: string;

  @OneToOne((type) => ImagesEntity, (profile) => profile.user)
  @JoinColumn({ name: 'image_id' })
  profile: ImagesEntity;

  @OneToMany(() => FilesEntity, (file) => file.user)
  @JoinColumn({ name: 'file_id' })
  files: FilesEntity[];

  @OneToMany((type) => ReservationsEntity, (reservations) => reservations.user)
  reservations: ReservationsEntity[];

  @OneToMany(
    (type) => ReservationsEntity,
    (drivingReservations) => drivingReservations.driver,
  )
  drivingReservations: ReservationsEntity[];
  
  @OneToMany(
    (type) => ReviewsEntity, 
    (reviews) => reviews.user, 
    {cascade: true}
  )
  reviews: ReviewsEntity[];

  @OneToMany(
    (type) => ReviewsEntity,
    (driverReviews) => driverReviews.driver,
    {cascade: true}
  )
  driverReview: ReviewsEntity[];

  @OneToMany(
    (type) => UsersChatroomsEntity,
    (usersChatrooms) => usersChatrooms.user,
  )
  usersChatRooms: UsersChatroomsEntity[];

  @PolymorphicChildren(() => NoticesEntity, { eager: false })
  notices: NoticesEntity[];

  @OneToOne((type) => BusesEntity, (bus) => bus.user)
  @JoinColumn({ name: 'bus_id' })
  bus: BusesEntity;

  async validateUserPassword(password: string): Promise<boolean> {
    const compareValue = bcrypt.compare(password, this.encrypted_password);
    return compareValue;
  }

  static async sample(): Promise<UsersEntity> {
    const user = await getRepository(UsersEntity)
      .createQueryBuilder('users')
      .orderBy('RANDOM()')
      .getOne();
    return user;
  }
}
