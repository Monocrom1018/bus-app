import { Factory, Seeder } from 'typeorm-seeding';
import { Items as Item } from '../../items/entities/item.entity';
import { Users as User } from '../../users/entities/user.entity';
import { Categories as Category } from '../../categories/entities/category.entity';
import { getRepository } from 'typeorm';

export default class CreateItems implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Item)()
      .map(async (item) => {
        const user = await getRepository(User)
          .createQueryBuilder('user')
          .orderBy('RANDOM()')
          .getOne();
        const category = await getRepository(Category)
          .createQueryBuilder('category')
          .orderBy('RANDOM()')
          .getOne();

        item.user = user;
        item.category = category;
        return item;
      })
      .createMany(50);
  }
}
