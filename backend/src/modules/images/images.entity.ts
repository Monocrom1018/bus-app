import { DateAuditEntity } from '@entities/date-audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@users/users.entity';
import { ImageType, Level } from './enum';
import { BusesEntity } from '@buses/buses.entity';

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
    enum: Level,
    default: Level.Public,
  })
  level: Level;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ImageType,
    default: ImageType.Main,
  })
  image_type: ImageType;

  @OneToOne(() => UsersEntity, (user) => user.profile, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
  
  @ManyToOne(() => BusesEntity, (bus) => bus.profiles, { nullable: true })
  @JoinColumn({ name: 'bus_id' })
  bus: BusesEntity;
}
