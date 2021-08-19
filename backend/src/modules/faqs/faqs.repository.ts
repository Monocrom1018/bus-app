import { EntityRepository, Repository } from 'typeorm';
import { FaqsEntity } from './faqs.entity';

@EntityRepository(FaqsEntity)
export class FaqsRepository extends Repository<FaqsEntity> {
  async getAll(): Promise<FaqsEntity[]> {
    const faqs = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return faqs;
  }
}
