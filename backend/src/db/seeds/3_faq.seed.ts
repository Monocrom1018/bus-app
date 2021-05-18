import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Faqs as Faq } from '../../faqs/entities/faq.entity';

export default class CreateNotices implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Faq)().createMany(10);
  }
}
