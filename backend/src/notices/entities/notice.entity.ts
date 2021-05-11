import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../../shared/entity/date-audit.entity';
@Entity()
export class Notices extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;
}
