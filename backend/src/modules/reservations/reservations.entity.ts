import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '@users/users.entity';
import { DateAuditEntity } from '@entities/date-audit.entity';
import { SchedulesEntity } from '@schedules/schedules.entity';
import { Status } from './enum';
import { ReviewsEntity } from '@reviews/reviews.entity';

@Entity('reservations')
export class ReservationsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  people: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
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

  @ManyToOne((type) => UsersEntity, (user) => user.reservations)
  user: UsersEntity;

  @ManyToOne((type) => UsersEntity, (driver) => driver.reservations)
  driver: UsersEntity;

  @OneToMany((type) => SchedulesEntity, (schedules) => schedules.reservation, {
    nullable: true,
  })
  schedules: SchedulesEntity[];

  @OneToOne((type) => ReviewsEntity, (review) => review.reservation, {onDelete: 'SET NULL'})
  @JoinColumn({ name: 'reviewId' })
  review: ReviewsEntity;
}
