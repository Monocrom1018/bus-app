import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export abstract class DateAudit extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
