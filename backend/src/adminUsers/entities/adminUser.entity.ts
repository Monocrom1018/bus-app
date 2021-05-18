import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DateAudit } from '../../shared/entity/date-audit.entity';

@Entity()
export class AdminUsers extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
