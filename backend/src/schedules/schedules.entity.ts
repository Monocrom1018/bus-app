import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DateAudit } from '@entities/date-audit.entity';
import { Reservations } from '@reservations/reservations.entity';

@Entity()
export class Schedules extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Reservations, (reservation) => reservation.schedules)
  reservation: Reservations;

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
  distance: number;
}
