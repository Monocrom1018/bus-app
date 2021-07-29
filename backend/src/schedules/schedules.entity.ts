import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DateAudit } from '@entities/date-audit.entity';
import { Reservations } from '@reservations/reservations.entity';

@Entity()
export class Schedules extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Reservations, (reservation) => reservation.schedules, {
    onDelete: 'CASCADE',
  })
  reservation: Reservations;

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
