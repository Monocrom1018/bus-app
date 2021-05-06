import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAudit } from '../../shared/entity/date-audit.entity';
import { Categories as Category } from '../../categories/entities/category.entity';
import { Users as User } from '../../users/entities/user.entity';
@Entity()
export class Items extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({
    length: 100,
    nullable: true,
  })
  description: string;

  // belongs_to
  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  status: string;
}
