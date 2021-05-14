import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
  getRepository,
  ManyToMany,
} from 'typeorm';
import { DateAudit } from '../../shared/entity/date-audit.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Messages } from '../../messages/entities/message.entity';
import { Rooms } from '../../rooms/entities/room.entity';

export enum UserType {
  NORMAL = 'normal',
  DRIVER = 'driver',
  COMPANY = 'company',
}

@Entity()
@Unique(['email'])
export class Users extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude() // serialization 제외
  password: string;

  @Column({ nullable: true })
  @Exclude()
  password_confirmation: string;

  @Column()
  @Exclude()
  encrypted_password: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.NORMAL,
  })
  user_type: UserType;

  @OneToMany((type) => Messages, (message) => message.user)
  messages: Messages[];

  @ManyToMany(() => Rooms)
  rooms: Rooms[];

  async validateUserPassword(password: string): Promise<boolean> {
    // const hash = await bcrypt.hash(password, this.encrypted_password);
    const compareValue = bcrypt.compare(password, this.encrypted_password);
    return compareValue;
    // return hash === this.password;
  }

  static async sample(): Promise<Users> {
    const user = await getRepository(Users)
      .createQueryBuilder('users')
      .orderBy('RANDOM()')
      .getOne();
    return user;
  }
}
