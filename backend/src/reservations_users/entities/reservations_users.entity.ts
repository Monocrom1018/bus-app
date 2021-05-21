import { Users } from '../../users/entities/user.entity';
import { Reservations } from '../../reservations/entities/reservation.entity';
import { DateAudit } from '../../shared/entity/date-audit.entity';

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
