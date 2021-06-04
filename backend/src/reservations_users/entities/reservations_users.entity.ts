import { Users } from '../../users/users.entity';
import { Reservations } from '../../reservations/reservations.entity';
import { DateAudit } from '../../shared/entities/date-audit.entity';

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservations_users extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => Reservations,
    (reservation) => reservation.reservations_users,
  )
  reservation: Reservations;

  @ManyToOne((type) => Users, (user) => user.reservations_users)
  user: Users;
}
