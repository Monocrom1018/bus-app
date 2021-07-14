import { DateAudit } from '../shared/entities/date-audit.entity';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Peaks extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, readonly: true })
  month: string;

  @Column({ nullable: false, default: false })
  peak: boolean;
}
