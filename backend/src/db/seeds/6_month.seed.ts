import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Months as Month } from '@months/months.entity';

export default class CreateMonths implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let monthIndex = 0;
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    await factory(Month)()
      .map(async (single) => {
        single.month = `${months[monthIndex]}월`;
        monthIndex++;
        return single;
      })
      .createMany(12);
  }
}
