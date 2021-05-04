import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
  getRepository,
} from 'typeorm';
import { DateAudit } from '../../shared/entity/date-audit.entity';
import { Items as Item } from '../../items/entities/item.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
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

  // has_many
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

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
