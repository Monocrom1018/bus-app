import { EntityRepository, Repository } from 'typeorm';
import { Categories as Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async findAll(): Promise<Category[]> {
    const categories = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return categories;
  }
}
