import { DateAuditEntity } from '@entities/date-audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@users/users.entity';
import { FileType, Level } from './enum';

@Entity('files')
export class FilesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  key: string;

  @Column({
    nullable: true,
    enum: Level,
    default: Level.Public,
  })
  level: Level;

  @Column({
    nullable: true,
  })
  file_type: string;

  @ManyToOne(() => UsersEntity, (user) => user.profile, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
