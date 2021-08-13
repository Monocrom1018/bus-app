import { DateAuditEntity } from '@entities/date-audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@users/users.entity';
import { ImageType, Level } from './enum';

@Entity('images')
export class ImagesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imagable_type: string;

  @Column({ nullable: true })
  imagable_id: number;

  @Column({ nullable: true })
  key: string;

  @Column({
    nullable: true,
    default: Level.Public,
  })
  level: Level;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ImageType,
  })
  image_type: ImageType;

  @ManyToOne(() => UsersEntity, (user) => user.profile, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
