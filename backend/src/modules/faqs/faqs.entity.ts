import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from '@entities/date-audit.entity';

@Entity('faqs')
export class FaqsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}
