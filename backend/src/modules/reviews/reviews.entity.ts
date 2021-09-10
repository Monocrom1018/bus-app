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
import { ReservationsEntity } from '@reservations/reservations.entity';

@Entity('reviews')
export class ReviewsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  rating: number;

  @ManyToOne((type) => UsersEntity, (user) => user.reviews, {onDelete: 'CASCADE'})
  user: UsersEntity;

  @ManyToOne((type) => UsersEntity, (driver) => driver.reviews, {onDelete: 'CASCADE'})
  driver: UsersEntity;

  @OneToOne((type) => ReservationsEntity, (reservation) => reservation.review, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'reservationId' })
  reservation: ReservationsEntity;
}
