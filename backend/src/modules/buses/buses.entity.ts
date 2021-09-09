import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { DateAuditEntity } from '@entities/date-audit.entity';
import { ImagesEntity } from '@images/images.entity';
import { UsersEntity } from '@users/users.entity';

@Entity('buses')
@Unique(['id'])
export class BusesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bus_type: string;

  @Column({ nullable: true })
  bus_old: number;

  @Column({ nullable: true })
  people_available: number;

  @Column({ nullable: true })
  bus_number: string;

  @Column({ nullable: true })
  sanitizer: boolean;

  @Column({ nullable: true })
  wifi: boolean;

  @Column({ nullable: true })
  usb: boolean;

  @Column({ nullable: true })
  fridge: boolean;

  @Column({ nullable: true })
  movie: boolean;

  @Column({ nullable: true })
  audio: boolean;

  @OneToOne((type) => UsersEntity, (user) => user.bus)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @OneToMany((type) => ImagesEntity, (profiles) => profiles.bus, {
    nullable: true,
  })
  @JoinColumn({ name: 'image_id' })
  profiles: ImagesEntity[];
}
