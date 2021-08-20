import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DateAuditEntity } from '@entities/date-audit.entity';

@Entity('admin_users')
export class AdminUsersEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
