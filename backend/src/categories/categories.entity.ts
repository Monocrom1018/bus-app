import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  getRepository,
} from 'typeorm';
import { DateAudit } from '../shared/entities/date-audit.entity';
import { Items as Item } from '../items/items.entity';
@Entity()
export class Categories extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column()
  position: number;

  @Column()
  image: string;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  static async sample(): Promise<Categories> {
    const category = await getRepository(Categories)
      .createQueryBuilder('category')
      .orderBy('RANDOM()')
      .getOne();
    return category;
  }
}
