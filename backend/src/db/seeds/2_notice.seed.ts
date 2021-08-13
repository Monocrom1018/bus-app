import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { NoticesEntity } from '@notices/notices.entity';

export default class CreateNotices implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(NoticesEntity)().createMany(20);
  }
}
