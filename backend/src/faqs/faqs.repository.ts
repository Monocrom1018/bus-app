import { EntityRepository, Repository } from 'typeorm';
import { Faqs as Faq } from './entities/faq.entity';

@EntityRepository(Faq)
export class FaqsRepository extends Repository<Faq> {
  async getAll(): Promise<Faq[]> {
    const faqs = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return faqs;
  }
}
