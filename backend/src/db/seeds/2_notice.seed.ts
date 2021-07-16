import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Notices as Notice } from '@notices/notices.entity';

export default class CreateNotices implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Notice)().createMany(20);
  }
}
