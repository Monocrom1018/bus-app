import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from '@entities/date-audit.entity';

@Entity('months')
export class MonthsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, readonly: true })
  month: string;

  @Column({ nullable: false, default: false })
  peak: boolean;
}
