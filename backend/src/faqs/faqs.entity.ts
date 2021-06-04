import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../shared/entities/date-audit.entity';
@Entity()
export class Faqs extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}
