import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DateAuditEntity } from '@entities/date-audit.entity';
import { ReservationsEntity } from '@reservations/reservations.entity';

@Entity('schedules')
export class SchedulesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => ReservationsEntity,
    (reservation) => reservation.schedules,
    {
      onDelete: 'CASCADE',
    },
  )
  reservation: ReservationsEntity;

  @Column()
  departure: string;

  @Column()
  departure_date: Date;

  @Column('text', {
    array: true,
    nullable: true,
  })
  stopover: string[];

  @Column()
  destination: string;

  @Column()
  return_date: Date;

  @Column({ nullable: true })
  landing: string;

  @Column()
  distance: number;
}
