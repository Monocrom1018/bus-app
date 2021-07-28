import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../shared/entities/date-audit.entity';

@Entity()
export class Months extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, readonly: true })
  month: string;

  @Column({ nullable: false, default: false })
  peak: boolean;
}
